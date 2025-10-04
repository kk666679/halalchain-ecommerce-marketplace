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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let BlockchainService = class BlockchainService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verifyCertification(productId) {
        const certification = await this.prisma.certification.findFirst({
            where: { productId, status: 'VERIFIED' },
        });
        return !!certification;
    }
    async createCertification(productId, data) {
        return this.prisma.certification.create({
            data: {
                productId,
                blockchainTx: 'placeholder_tx_hash',
                halalScore: data.halalScore,
                status: 'PENDING',
                issuedBy: data.issuedBy,
            },
        });
    }
    async getCertifications(productId) {
        return this.prisma.certification.findMany({
            where: { productId },
        });
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map