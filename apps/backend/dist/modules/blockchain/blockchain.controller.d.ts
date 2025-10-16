import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    getProductHalalStatus(productId: string): Promise<{
        isValid: boolean;
        hash: any;
        score: any;
        status: any;
    } | null>;
    createCertification(certificationData: any): Promise<any>;
    getCertifications(): Promise<any>;
}
