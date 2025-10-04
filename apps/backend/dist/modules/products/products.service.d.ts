import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../common/prisma.service';
export declare class ProductsService {
    private prisma;
    private httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
