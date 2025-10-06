import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<any>;
}
