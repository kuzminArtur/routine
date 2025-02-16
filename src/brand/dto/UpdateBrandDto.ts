import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './CreateBrandDto';
import { Prisma } from '@prisma/client';

export class UpdateBrandDto
  extends PartialType(CreateBrandDto)
  implements Prisma.BrandUpdateInput {}
