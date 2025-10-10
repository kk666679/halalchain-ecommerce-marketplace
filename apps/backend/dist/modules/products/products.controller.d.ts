import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        category: string;
        vendorId: string;
        halalCertified: boolean;
        blockchainHash: string | null;
        stockQuantity: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        category: string;
        vendorId: string;
        halalCertified: boolean;
        blockchainHash: string | null;
        stockQuantity: number;
    } | null>;
    create(createProductDto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        category: string;
        vendorId: string;
        halalCertified: boolean;
        blockchainHash: string | null;
        stockQuantity: number;
    }>;
    update(id: string, updateProductDto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        category: string;
        vendorId: string;
        halalCertified: boolean;
        blockchainHash: string | null;
        stockQuantity: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        category: string;
        vendorId: string;
        halalCertified: boolean;
        blockchainHash: string | null;
        stockQuantity: number;
    }>;
}
