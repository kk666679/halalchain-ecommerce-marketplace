import { PrismaService } from '../../common/prisma.service';
export declare class BlockchainService {
    private prisma;
    constructor(prisma: PrismaService);
    getProductHalalStatus(productId: string): Promise<any>;
    createCertification(certificationData: any): Promise<any>;
    getCertifications(): Promise<any>;
}
