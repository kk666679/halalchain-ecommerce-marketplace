"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiToolsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../../common/prisma.service");
let AiToolsService = class AiToolsService {
    prisma;
    httpService;
    anthropic = null;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (apiKey) {
            this.anthropic = new sdk_1.default({
                apiKey,
            });
        }
        else {
            console.warn('ANTHROPIC_API_KEY not set, using mock responses');
        }
    }
    tools = [
        {
            name: 'query_database',
            description: 'Run a safe parameterized SQL query on the database. Returns JSON results.',
            input_schema: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'The SQL query to execute',
                    },
                    params: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Parameters for the query',
                    },
                },
                required: ['query'],
            },
        },
        {
            name: 'api_request',
            description: 'Make an authenticated request to an external API.',
            input_schema: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'The API endpoint URL',
                    },
                    method: {
                        type: 'string',
                        enum: ['GET', 'POST', 'PUT', 'DELETE'],
                        description: 'HTTP method',
                    },
                    headers: {
                        type: 'object',
                        description: 'Request headers',
                    },
                    body: {
                        type: 'string',
                        description: 'Request body as JSON string',
                    },
                },
                required: ['url', 'method'],
            },
        },
        {
            name: 'translate',
            description: 'Translate text to a target language.',
            input_schema: {
                type: 'object',
                properties: {
                    text: {
                        type: 'string',
                        description: 'Text to translate',
                    },
                    target_lang: {
                        type: 'string',
                        description: 'Target language code, e.g., "es" for Spanish',
                    },
                },
                required: ['text', 'target_lang'],
            },
        },
        {
            name: 'seo_analyzer',
            description: 'Analyze a webpage for SEO best practices.',
            input_schema: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        description: 'The URL of the webpage to analyze',
                    },
                },
                required: ['url'],
            },
        },
    ];
    async handleToolCall(toolName, args) {
        switch (toolName) {
            case 'query_database':
                return await this.queryDatabase(args.query, args.params || []);
            case 'api_request':
                return await this.apiRequest(args.url, args.method, args.headers, args.body);
            case 'translate':
                return await this.translate(args.text, args.target_lang);
            case 'seo_analyzer':
                return await this.seoAnalyzer(args.url);
            default:
                throw new Error(`Unknown tool: ${toolName}`);
        }
    }
    async chat(messages) {
        if (!this.anthropic) {
            return {
                role: 'assistant',
                content: "I'm sorry, but the AI service is currently unavailable. Please try again later.",
            };
        }
        const systemPrompt = `You are HalalChain AI, an intelligent assistant specialized in Islamic finance, Halal compliance, and Sharia-compliant e-commerce. You help users with:

- Halal certification processes and requirements
- Islamic finance principles (riba-free banking, profit-sharing)
- Sharia-compliant business practices
- HalalChain platform features and products
- Finding verified Halal products and vendors
- Islamic business ethics and guidelines

Always provide helpful, accurate information while respecting Islamic principles. If you need to use tools for database queries or external data, do so appropriately.`;
        const anthropicMessages = [
            {
                role: 'assistant',
                content: systemPrompt,
            },
            ...messages.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
            })),
        ];
        const response = await this.anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: anthropicMessages,
            tools: this.tools,
        });
        if (response.stop_reason === 'tool_use') {
            const toolCalls = response.content.filter((c) => c.type === 'tool_use');
            for (const toolCall of toolCalls) {
                const result = await this.handleToolCall(toolCall.name, toolCall.input);
                anthropicMessages.push({
                    role: 'assistant',
                    content: response.content,
                });
                anthropicMessages.push({
                    role: 'user',
                    content: [
                        {
                            type: 'tool_result',
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(result),
                        },
                    ],
                });
            }
            const finalResponse = await this.anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4096,
                messages: anthropicMessages,
                tools: this.tools,
            });
            return {
                role: 'assistant',
                content: finalResponse.content[0].text,
            };
        }
        return {
            role: 'assistant',
            content: response.content[0].text,
        };
    }
    async generateSite(prompt) {
        if (!this.anthropic) {
            return {
                hero: 'Welcome to Your Halal Business Site',
                features: 'Our Halal Products and Services',
                contact: 'Get In Touch',
            };
        }
        const messages = [
            {
                role: 'user',
                content: `Generate a professional business website focused on halal products/services with the following structure:
- Homepage: Introduction to halal offerings and mission
- Halal Marketplace/Services: Display certified halal products or services
- Halal Agent Assistant: AI-based assistant to help users find verified halal options and guidance
- Halal Certification Info: Resources on how products are verified
- Contact/Support: For agent inquiries or business partnerships

Design guidelines: Clean, modern UI, mobile-friendly, accessible, respectful of cultural and religious sensitivities.

User prompt: ${prompt}. Use available tools to fetch dynamic data if needed.`,
            },
        ];
        const response = await this.anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages,
            tools: this.tools,
        });
        if (response.stop_reason === 'tool_use') {
            const toolCalls = response.content.filter((c) => c.type === 'tool_use');
            for (const toolCall of toolCalls) {
                const result = await this.handleToolCall(toolCall.name, toolCall.input);
                messages.push({
                    role: 'assistant',
                    content: response.content,
                });
                messages.push({
                    role: 'user',
                    content: [
                        {
                            type: 'tool_result',
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(result),
                        },
                    ],
                });
            }
            const finalResponse = await this.anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4096,
                messages,
                tools: this.tools,
            });
            return this.parseSite(finalResponse.content[0].text);
        }
        return this.parseSite(response.content[0].text);
    }
    parseSite(content) {
        try {
            return JSON.parse(content);
        }
        catch {
            return {
                hero: 'Generated Hero',
                features: content,
                contact: 'Contact Info',
            };
        }
    }
    async queryDatabase(query, params) {
        try {
            if (!query.toLowerCase().startsWith('select')) {
                throw new Error('Only SELECT queries are allowed');
            }
            const result = await this.prisma.$queryRaw(query, ...params);
            return { result, rowCount: Array.isArray(result) ? result.length : 0 };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async apiRequest(url, method, headers, body) {
        try {
            const config = {
                method,
                url,
                headers: headers || {},
                data: body ? JSON.parse(body) : undefined,
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.request(config));
            return { status: response.status, data: response.data };
        }
        catch (error) {
            return { error: error.response?.data || error.message };
        }
    }
    async translate(text, targetLang) {
        try {
            const url = 'https://libretranslate.com/translate';
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, {
                q: text,
                source: 'auto',
                target: targetLang,
            }));
            return { translated_text: response.data.translatedText };
        }
        catch (error) {
            return { error: 'Translation failed' };
        }
    }
    async seoAnalyzer(url) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const html = response.data;
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
            const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
            const imgMatches = html.match(/<img[^>]*>/gi) || [];
            return {
                title: titleMatch ? titleMatch[1] : 'No title found',
                meta_description: metaDescMatch
                    ? metaDescMatch[1]
                    : 'No meta description found',
                h1_count: h1Matches.length,
                image_count: imgMatches.length,
                has_title: !!titleMatch,
                has_meta_desc: !!metaDescMatch,
                recommendations: [
                    !titleMatch && 'Add a title tag',
                    !metaDescMatch && 'Add a meta description',
                    h1Matches.length === 0 && 'Add at least one H1 tag',
                    imgMatches.length === 0 && 'Consider adding images',
                ].filter(Boolean),
            };
        }
        catch (error) {
            return { error: 'Failed to analyze webpage' };
        }
    }
};
exports.AiToolsService = AiToolsService;
exports.AiToolsService = AiToolsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], AiToolsService);
//# sourceMappingURL=ai-tools.service.js.map