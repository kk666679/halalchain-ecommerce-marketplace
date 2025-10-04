import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('verify/:productId')
  async verifyCertification(@Param('productId') productId: string): Promise<boolean> {
    return this.blockchainService.verifyCertification(productId);
  }

  @Post('certify')
  async createCertification(@Body() data: { productId: string; halalScore: number; issuedBy: string }) {
    return this.blockchainService.createCertification(data.productId, data);
  }

  @Get('certifications/:productId')
  async getCertifications(@Param('productId') productId: string) {
    return this.blockchainService.getCertifications(productId);
  }
}
