import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, addToCartDto: {
        productId: string;
        quantity: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        quantity: number;
    }>;
    getCart(req: any): Promise<{
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
    updateCartItem(req: any, cartItemId: string, updateCartDto: {
        quantity: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        quantity: number;
    } | null>;
    removeFromCart(req: any, cartItemId: string): Promise<{
        message: string;
    }>;
    checkout(req: any): Promise<{
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
