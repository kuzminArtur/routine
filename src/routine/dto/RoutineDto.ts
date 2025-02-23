import { DayPartDto } from './DayPartDto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../product/dto';

export class RoutineDto extends DayPartDto {
  @ApiProperty({ type: ProductDto, isArray: true })
  products: ProductDto[];
}
