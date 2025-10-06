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
    async getProductHalalStatus(productId) {
        const certification = await this.prisma.halalCertification.findFirst({
            where: { productId },
        });
        return certification;
    }
    async createCertification(certificationData) {
        const certification = await this.prisma.halalCertification.create({
            data: certificationData,
        });
        if (certification.halalScore > 75) {
            await this.prisma.product.update({
                where: { id: certificationData.productId },
                data: { isHalalCertified: true },
            });
        }
        return certification;
    }
    async getCertifications() {
        return await this.prisma.halalCertification.findMany({
            include: {
                product: true,
                issuer: true,
            },
        });
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map