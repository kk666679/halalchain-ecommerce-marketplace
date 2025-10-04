import { BlockchainService } from './blockchain.service';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    verifyCertification(productId: string): Promise<boolean>;
    createCertification(data: {
        productId: string;
        halalScore: number;
        issuedBy: string;
    }): Promise<any>;
    getCertifications(productId: string): Promise<any>;
}
