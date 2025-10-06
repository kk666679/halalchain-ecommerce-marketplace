import { PrismaService } from '../../common/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createProductDto: any): Promise<any>;
    update(id: string, updateProductDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
