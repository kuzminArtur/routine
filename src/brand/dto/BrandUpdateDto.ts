import { PartialType } from '@nestjs/swagger';
import { BrandCreateDto } from './BrandCreateDto';
import { Prisma } from '@prisma/client';

export class BrandUpdateDto
  extends PartialType(BrandCreateDto)
  implements Prisma.BrandUpdateInput {}
