import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './ProductCreateDto';
import { Prisma } from '@prisma/client';

export class ProductUpdateDto
  extends PartialType(ProductCreateDto)
  implements Prisma.BrandUpdateInput {}
