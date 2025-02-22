import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { RoutineService } from '../routine/routine.service';
import { ProductCreateDto, ProductUpdateDto } from './dto';

@Injectable()
export class ProductService {
  private include: Prisma.ProductInclude = {
    brand: {
      select: {
        id: true,
        name: true,
      },
    },
    dayParts: {
      include: {
        dayPart: {
          select: {
            id: true,
            alias: true,
          },
        },
      },
    },
  };
  constructor(
    private prisma: PrismaService,
    private routineService: RoutineService,
  ) {}

  async createProduct(dto: ProductCreateDto): Promise<Product> {
    const { brand, dayParts, ...data } = dto;

    const brandConnect = brand
      ? {
          connect: {
            id: brand.id,
          },
        }
      : undefined;

    return this.prisma.product.create({
      data: {
        ...data,
        brand: brandConnect,
        dayParts: {
          create: dayParts.map((dayPart) => ({
            dayPart: {
              connect: {
                id: dayPart.id,
              },
            },
          })),
        },
      },
      include: this.include,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }

  async updateProduct(
    where: Prisma.ProductWhereUniqueInput,
    dto: ProductUpdateDto,
  ): Promise<Product> {
    return this.prisma.product.update({
      data: {},
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
