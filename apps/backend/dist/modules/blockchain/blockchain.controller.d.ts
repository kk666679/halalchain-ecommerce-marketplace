import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    getProductHalalStatus(productId: string): Promise<{
        isValid: boolean;
        hash: string;
        score: number;
        status: import("@prisma/client").$Enums.HalalStatus;
    } | null>;
    createCertification(certificationData: any): Promise<{
        smartContract: string | null;
        id: string;
        productId: string;
        status: import("@prisma/client").$Enums.HalalStatus;
        blockchainTx: string;
        halalScore: number;
        issuedBy: string;
        issuedAt: Date;
        expiresAt: Date | null;
        certificateUrl: string | null;
        auditTrail: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getCertifications(): Promise<({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            compareAtPrice: number | null;
            category: string;
            subcategory: string | null;
            sku: string;
            barcode: string | null;
            weight: number | null;
            dimensions: string | null;
            images: string[];
            vendorId: string;
            halalCertified: boolean;
            blockchainHash: string | null;
            stockQuantity: number;
            minStockLevel: number;
            maxStockLevel: number;
            isActive: boolean;
            tags: string[];
            rating: number | null;
            reviewCount: number;
        };
    } & {
        smartContract: string | null;
        id: string;
        productId: string;
        status: import("@prisma/client").$Enums.HalalStatus;
        blockchainTx: string;
        halalScore: number;
        issuedBy: string;
        issuedAt: Date;
        expiresAt: Date | null;
        certificateUrl: string | null;
        auditTrail: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
}
