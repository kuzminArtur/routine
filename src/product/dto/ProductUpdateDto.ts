import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './ProductCreateDto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
