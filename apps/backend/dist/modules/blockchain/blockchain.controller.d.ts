import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    getProductHalalStatus(productId: string): Promise<any>;
    createCertification(certificationData: any): Promise<any>;
    getCertifications(): Promise<any>;
}
