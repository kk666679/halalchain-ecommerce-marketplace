import { IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class CheckoutDto {
  @IsString()
  shippingAddress: string;

  @IsString()
  paymentMethod: string;
}