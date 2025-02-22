import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { ProductCreateDto, ProductUpdateDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Product | null> {
    return this.productService.getProduct({ id });
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findProducts();
  }

  @Post()
  @ApiBody({ type: ProductCreateDto })
  async createProduct(@Body() dto: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Put(':id')
  @ApiBody({ type: ProductUpdateDto })
  async updateProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.updateProduct({ id }, dto);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Product> {
    return this.productService.deleteProduct({ id });
  }
}
