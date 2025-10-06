import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, addToCartDto: {
        productId: string;
        quantity: number;
    }): Promise<any>;
    getCart(req: any): Promise<{
        items: any;
        total: any;
    }>;
    updateCartItem(req: any, cartItemId: string, updateCartDto: {
        quantity: number;
    }): Promise<any>;
    removeFromCart(req: any, cartItemId: string): Promise<{
        message: string;
    }>;
    checkout(req: any): Promise<any>;
}
