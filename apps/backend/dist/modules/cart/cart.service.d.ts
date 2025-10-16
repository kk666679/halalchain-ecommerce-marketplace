import { PrismaService } from '../../common/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: string, productId: string, quantity: number): Promise<any>;
    getCart(userId: string): Promise<{
        items: any;
        total: any;
    }>;
    updateCartItem(userId: string, cartItemId: string, quantity: number): Promise<any>;
    removeFromCart(userId: string, cartItemId: string): Promise<{
        message: string;
    }>;
    checkout(userId: string): Promise<any>;
}
