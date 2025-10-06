"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.stockQuantity < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        const existingCartItem = await this.prisma.cartItem.findFirst({
            where: {
                userId,
                productId,
            },
        });
        if (existingCartItem) {
            const updatedCartItem = await this.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
            return updatedCartItem;
        }
        else {
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
    async getCart(userId) {
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
    async updateCartItem(userId, cartItemId, quantity) {
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
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (quantity <= 0) {
            await this.prisma.cartItem.delete({
                where: { id: cartItemId },
            });
            return null;
        }
        if (cartItem.product.stockQuantity < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        const updatedCartItem = await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
        return updatedCartItem;
    }
    async removeFromCart(userId, cartItemId) {
        const cartItem = await this.prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                userId,
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        await this.prisma.cartItem.delete({
            where: { id: cartItemId },
        });
        return { message: 'Item removed from cart' };
    }
    async checkout(userId) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
        });
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        for (const item of cartItems) {
            if (item.product.stockQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${item.product.name}`);
            }
        }
        const order = await this.prisma.order.create({
            data: {
                userId,
                total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
                status: 'PENDING',
            },
        });
        for (const item of cartItems) {
            await this.prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                },
            });
            await this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stockQuantity: item.product.stockQuantity - item.quantity,
                },
            });
        }
        await this.prisma.cartItem.deleteMany({
            where: { userId },
        });
        return order;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map