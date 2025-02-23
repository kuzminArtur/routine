import { $Enums, DayPart } from '@prisma/client';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DayPartDto implements DayPart {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: 'integer' })
  id: number;

  @ApiProperty()
  alias: $Enums.DayPartAlias;

  createdAt: Date;

  updatedAt: Date;
}
