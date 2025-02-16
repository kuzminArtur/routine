import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const { dayPartId, ...data } = dto;
    const createData = dayPartId?.length
      ? {
          ...data,
          dayParts: { connect: dayPartId.map((id) => ({ dayPartId: id })) },
        }
      : data;
    return this.prisma.product.create({
      data: createData,
    });
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
