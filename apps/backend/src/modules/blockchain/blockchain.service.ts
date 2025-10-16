import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class BlockchainService {
  constructor(private prisma: PrismaService) {}

  async getProductHalalStatus(productId: string) {
    const certification = await this.prisma.certification.findFirst({
      where: { productId },
      orderBy: { issuedAt: 'desc' },
    });

    return certification ? {
      isValid: certification.status === 'VERIFIED',
      hash: certification.blockchainTx,
      score: certification.halalScore,
      status: certification.status,
    } : null;
  }

  async createCertification(certificationData: any) {
    const certification = await this.prisma.certification.create({
      data: certificationData,
    });

    // Update product halal status
    if (certification.halalScore > 75) {
      await this.prisma.product.update({
        where: { id: certificationData.productId },
        data: { halalCertified: true },
      });
    }

    return certification;
  }

  async getCertifications() {
    return await this.prisma.certification.findMany({
      include: {
        product: true,
      },
    });
  }
}
