import { PrismaService } from '../../common/prisma.service';
export declare class BlockchainService {
    private prisma;
    constructor(prisma: PrismaService);
    verifyCertification(productId: string): Promise<boolean>;
    createCertification(productId: string, data: any): Promise<any>;
    getCertifications(productId: string): Promise<any>;
}
