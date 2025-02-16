import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  note?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false })
  brandId?: number;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ApiProperty({ type: 'integer', isArray: true, required: false })
  dayPartId?: number[];
}
