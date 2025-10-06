import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
        role?: string;
    }): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<any>;
}
