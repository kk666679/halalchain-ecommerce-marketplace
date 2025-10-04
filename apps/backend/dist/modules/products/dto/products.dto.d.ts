export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    category: string;
    vendorId: string;
    halalCertified?: boolean;
    blockchainHash?: string;
    stockQuantity?: number;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    vendorId?: string;
    halalCertified?: boolean;
    blockchainHash?: string;
    stockQuantity?: number;
}
