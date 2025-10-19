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
        orderNumber: string;
        subtotal: number;
        tax: number;
        shipping: number;
        discount: number;
        total: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        notes: string | null;
        trackingNumber: string | null;
        estimatedDelivery: Date | null;
        deliveredAt: Date | null;
    }>;
}
