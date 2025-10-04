import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  category: string;

  @IsString()
  vendorId: string;

  @IsBoolean()
  @IsOptional()
  halalCertified?: boolean;

  @IsString()
  @IsOptional()
  blockchainHash?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  stockQuantity?: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  vendorId?: string;

  @IsBoolean()
  @IsOptional()
  halalCertified?: boolean;

  @IsString()
  @IsOptional()
  blockchainHash?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  stockQuantity?: number;
}
