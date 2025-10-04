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
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const blockchain_service_1 = require("./blockchain.service");
let BlockchainController = class BlockchainController {
    blockchainService;
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    async verifyCertification(productId) {
        return this.blockchainService.verifyCertification(productId);
    }
    async createCertification(data) {
        return this.blockchainService.createCertification(data.productId, data);
    }
    async getCertifications(productId) {
        return this.blockchainService.getCertifications(productId);
    }
};
exports.BlockchainController = BlockchainController;
__decorate([
    (0, common_1.Get)('verify/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "verifyCertification", null);
__decorate([
    (0, common_1.Post)('certify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "createCertification", null);
__decorate([
    (0, common_1.Get)('certifications/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getCertifications", null);
exports.BlockchainController = BlockchainController = __decorate([
    (0, common_1.Controller)('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map