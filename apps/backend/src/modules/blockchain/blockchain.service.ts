import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class BlockchainService {
  constructor(private prisma: PrismaService) {}

  async getProductHalalStatus(productId: string) {
    const certification = await this.prisma.halalCertification.findFirst({
      where: { productId },
    });

    return certification;
  }

  async createCertification(certificationData: any) {
    const certification = await this.prisma.halalCertification.create({
      data: certificationData,
    });

    // Update product halal status
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
}
