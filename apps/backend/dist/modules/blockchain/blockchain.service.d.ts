import { PrismaService } from '../../common/prisma.service';
export declare class BlockchainService {
    private prisma;
    constructor(prisma: PrismaService);
    getProductHalalStatus(productId: string): Promise<{
        isValid: boolean;
        hash: any;
        score: any;
        status: any;
    } | null>;
    createCertification(certificationData: any): Promise<any>;
    getCertifications(): Promise<any>;
}
