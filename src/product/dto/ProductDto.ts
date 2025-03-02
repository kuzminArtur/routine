import { IsInt, Min } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { BrandDto } from '../../brand/dto';
import { DayPartDto } from '../../routine/dto';

export class ProductDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({
    oneOf: [{ $ref: getSchemaPath(BrandDto) }, { type: 'null' }],
  })
  brand?: BrandDto | null;

  @ApiPropertyOptional({ type: DayPartDto, isArray: true })
  dayParts?: DayPartDto[] | null;

  @ApiPropertyOptional({ type: 'string' })
  note: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
