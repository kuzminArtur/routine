import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }

  async updateProduct(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async getProduct(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({ where });
  }

  async findProducts(where?: Prisma.ProductWhereInput): Promise<Product[]> {
    return this.prisma.product.findMany({ where });
  }
}
