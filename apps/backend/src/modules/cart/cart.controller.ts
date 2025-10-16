import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Request() req: any,
    @Body() addToCartDto: { productId: string; quantity: number },
  ) {
    const userId = req.user.id;
    return await this.cartService.addToCart(
      userId,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @Get()
  async getCart(@Request() req: any) {
    const userId = req.user.id;
    return await this.cartService.getCart(userId);
  }

  @Patch('item/:id')
  async updateCartItem(
    @Request() req: any,
    @Param('id') cartItemId: string,
    @Body() updateCartDto: { quantity: number },
  ) {
    const userId = req.user.id;
    return await this.cartService.updateCartItem(
      userId,
      cartItemId,
      updateCartDto.quantity,
    );
  }

  @Delete('item/:id')
  async removeFromCart(@Request() req: any, @Param('id') cartItemId: string) {
    const userId = req.user.id;
    return await this.cartService.removeFromCart(userId, cartItemId);
  }

  @Post('checkout')
  async checkout(@Request() req: any) {
    const userId = req.user.id;
    return await this.cartService.checkout(userId);
  }
}
