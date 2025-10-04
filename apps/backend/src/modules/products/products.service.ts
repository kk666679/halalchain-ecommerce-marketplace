import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../common/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: { vendor: true, certifications: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { vendor: true, certifications: true },
    });
  }

  async create(data: any) {
    // Placeholder for Magento sync
    // Integrate GraphQL/REST API to sync from Magento
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
