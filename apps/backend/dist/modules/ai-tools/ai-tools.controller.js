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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiToolsController = void 0;
const common_1 = require("@nestjs/common");
const ai_tools_service_1 = require("./ai-tools.service");
let AiToolsController = class AiToolsController {
    aiToolsService;
    constructor(aiToolsService) {
        this.aiToolsService = aiToolsService;
    }
    async chat(body) {
        return this.aiToolsService.chat(body.messages);
    }
    async generateSite(prompt) {
        return this.aiToolsService.generateSite(prompt);
    }
};
exports.AiToolsController = AiToolsController;
__decorate([
    (0, common_1.Post)('chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiToolsController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('generate-site'),
    __param(0, (0, common_1.Body)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiToolsController.prototype, "generateSite", null);
exports.AiToolsController = AiToolsController = __decorate([
    (0, common_1.Controller)('ai-tools'),
    __metadata("design:paramtypes", [ai_tools_service_1.AiToolsService])
], AiToolsController);
//# sourceMappingURL=ai-tools.controller.js.map