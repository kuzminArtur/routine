import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Brand, Prisma } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async createBrand(data: Prisma.BrandCreateInput): Promise<Brand> {
    return this.prisma.brand.create({ data });
  }

  async deleteBrand(where: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    return this.prisma.brand.delete({ where });
  }

  async updateBrand(
    where: Prisma.BrandWhereUniqueInput,
    data: Prisma.BrandUpdateInput,
  ): Promise<Brand> {
    return this.prisma.brand.update({
      data,
      where,
    });
  }

  async getBrand(where: Prisma.BrandWhereUniqueInput): Promise<Brand | null> {
    return this.prisma.brand.findUnique({ where });
  }

  async findBrands(where?: Prisma.BrandWhereInput): Promise<Brand[]> {
    return this.prisma.brand.findMany({ where });
  }
}
