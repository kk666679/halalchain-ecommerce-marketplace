import { PrismaService } from '../../common/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        quantity: number;
    }>;
    getCart(userId: string): Promise<{
        items: ({
            product: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
            quantity: number;
        })[];
        total: number;
    }>;
    updateCartItem(userId: string, cartItemId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        quantity: number;
    } | null>;
    removeFromCart(userId: string, cartItemId: string): Promise<{
        message: string;
    }>;
    checkout(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
}
