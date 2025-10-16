import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createProductDto: any): Promise<any>;
    update(id: string, updateProductDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
