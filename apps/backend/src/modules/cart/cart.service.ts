import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: string, productId: string, quantity: number) {
    // Check if product exists and has sufficient stock
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stockQuantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // Check if item already exists in cart
    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      // Update quantity
      const updatedCartItem = await this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });

      return updatedCartItem;
    } else {
      // Create new cart item
      const newCartItem = await this.prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });

      return newCartItem;
    }
  }

  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    return {
      items: cartItems,
      total,
    };
  }

  async updateCartItem(userId: string, cartItemId: string, quantity: number) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
      include: {
        product: true,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return null;
    }

    if (cartItem.product.stockQuantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const updatedCartItem = await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return updatedCartItem;
  }

  async removeFromCart(userId: string, cartItemId: string) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return { message: 'Item removed from cart' };
  }

  async checkout(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Check stock availability
    for (const item of cartItems) {
      if (item.product.stockQuantity < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${item.product.name}`);
      }
    }

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    // Create order
    const order = await this.prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId,
        subtotal: total,
        total,
        status: 'PENDING',
        shippingAddress: {},
      },
    });

    // Create order items and update product stock
    for (const item of cartItems) {
      await this.prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        },
      });

      // Update product stock
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: item.product.stockQuantity - item.quantity,
        },
      });
    }

    // Clear cart
    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return order;
  }
}
