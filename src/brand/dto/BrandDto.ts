import { Brand } from '@prisma/client';
import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BrandDto implements Brand {
  @IsInt()
  @Min(1)
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}
