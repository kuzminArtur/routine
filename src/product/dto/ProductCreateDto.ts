import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { DayPart, Prisma } from '@prisma/client';
import { BrandCreateDto, BrandDto } from '../../brand/dto';
import { Type } from 'class-transformer';
import { DayPartDto } from '../../routine/dto';

export class ProductCreateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  note?: string;

  @IsOptional()
  @Type(() => PickType(BrandDto, ['id']))
  @ValidateNested()
  @ApiProperty({ required: false })
  brand?: Pick<BrandDto, 'id'>;

  @IsArray()
  @IsOptional()
  @Type(() => PickType(DayPartDto, ['id']))
  @ValidateNested({ each: true })
  // @ApiProperty({ type: 'integer', isArray: true, required: false })
  dayParts: Pick<DayPartDto, 'id'>[];
}
