import { DayPart } from '@prisma/client';
import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DayPartDto implements DayPart {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: 'integer' })
  id: number;

  @ApiProperty()
  @IsString()
  alias: string;

  @IsInt()
  order: number;

  createdAt: Date;

  updatedAt: Date;
}
