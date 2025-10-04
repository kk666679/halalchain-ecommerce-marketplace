import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
        role?: string;
    }): Promise<{
        access_token: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
