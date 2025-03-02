import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BrandCreateDto implements Prisma.BrandCreateInput {
  @IsString()
  @ApiProperty()
  name: string;
}
