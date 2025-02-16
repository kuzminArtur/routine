import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './CreateProductDto';
import { Prisma } from '@prisma/client';

export class UpdateProductDto
  extends PartialType(CreateProductDto)
  implements Prisma.BrandUpdateInput {}
