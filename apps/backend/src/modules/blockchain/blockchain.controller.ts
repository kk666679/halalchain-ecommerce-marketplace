import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('product/:id/halal-status')
  async getProductHalalStatus(@Param('id') productId: string) {
    return await this.blockchainService.getProductHalalStatus(productId);
  }

  @Post('certification')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'AUDITOR')
  async createCertification(@Body() certificationData: any) {
    return await this.blockchainService.createCertification(certificationData);
  }

  @Get('certifications')
  async getCertifications() {
    return await this.blockchainService.getCertifications();
  }
}
