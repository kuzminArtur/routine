import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { ProductCreateDto, ProductUpdateDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  private include: Prisma.ProductInclude = {
    brand: {
      select: {
        id: true,
        name: true,
      },
    },
    dayParts: {
      select: {
        id: true,
        alias: true,
        order: true,
      },
    },
  };

  async createProduct(dto: ProductCreateDto): Promise<Product> {
    const { brand, dayParts, ...data } = dto;

    const brandConnect = brand
      ? {
          connect: {
            id: brand.id,
          },
        }
      : undefined;

    const dayPartsConnect = dayParts?.length
      ? {
          connect: dayParts.map((dayPart) => ({
            id: dayPart.id,
          })),
        }
      : undefined;

    const result = await this.prisma.product.create({
      data: {
        ...data,
        brand: brandConnect,
        dayParts: dayPartsConnect,
      },
      include: this.include,
    });
    return result;
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }

  async updateProduct(
    where: Prisma.ProductWhereUniqueInput,
    dto: ProductUpdateDto,
  ): Promise<Product> {
    const { brand, dayParts, ...data } = dto;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async getProduct(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({ where, include: this.include });
  }

  async findProducts(where?: Prisma.ProductWhereInput): Promise<Product[]> {
    return this.prisma.product.findMany({ where, include: this.include });
  }
}
