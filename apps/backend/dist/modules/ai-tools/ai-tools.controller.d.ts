import { AiToolsService } from './ai-tools.service';
export declare class AiToolsController {
    private readonly aiToolsService;
    constructor(aiToolsService: AiToolsService);
    chat(body: {
        messages: Array<{
            role: string;
            content: string;
        }>;
    }): Promise<any>;
    generateSite(prompt: string): Promise<any>;
}
