import { HttpService } from '@nestjs/axios';
import OpenAI from 'openai';
import { PrismaService } from '../../common/prisma.service';
export declare class AiToolsService {
    private prisma;
    private httpService;
    private openai;
    constructor(prisma: PrismaService, httpService: HttpService);
    getChatCompletion(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]): Promise<string | null>;
    private tools;
    private handleToolCall;
    chat(messages: Array<{
        role: string;
        content: string | any[];
    }>): Promise<any>;
    generateSite(prompt: string): Promise<any>;
    private parseSite;
    private queryDatabase;
    private apiRequest;
    private translate;
    private seoAnalyzer;
}
