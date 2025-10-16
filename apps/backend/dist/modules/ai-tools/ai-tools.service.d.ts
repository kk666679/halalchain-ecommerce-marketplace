import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../common/prisma.service';
export declare class AiToolsService {
    private prisma;
    private httpService;
    private anthropic;
    constructor(prisma: PrismaService, httpService: HttpService);
    private tools;
    private handleToolCall;
    chat(messages: Array<{
        role: string;
        content: string;
    }>): Promise<any>;
    generateSite(prompt: string): Promise<any>;
    private parseSite;
    private queryDatabase;
    private apiRequest;
    private translate;
    private seoAnalyzer;
}
