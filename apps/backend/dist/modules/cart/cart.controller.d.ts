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
        total: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
}
