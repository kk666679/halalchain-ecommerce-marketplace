"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiToolsModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const ai_tools_controller_1 = require("./ai-tools.controller");
const ai_tools_service_1 = require("./ai-tools.service");
const prisma_module_1 = require("../../common/prisma.module");
let AiToolsModule = class AiToolsModule {
};
exports.AiToolsModule = AiToolsModule;
exports.AiToolsModule = AiToolsModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, prisma_module_1.PrismaModule],
        controllers: [ai_tools_controller_1.AiToolsController],
        providers: [ai_tools_service_1.AiToolsService],
    })
], AiToolsModule);
//# sourceMappingURL=ai-tools.module.js.map