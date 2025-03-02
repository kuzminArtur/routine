import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ProductCreateDto, ProductDto, ProductUpdateDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @ApiResponse({ type: ProductDto, status: HttpStatus.OK })
  async getProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProductDto | null> {
    return this.productService.getProduct({ id });
  }

  @Get()
  @ApiResponse({ type: ProductDto, isArray: true, status: HttpStatus.OK })
  async getProducts(): Promise<ProductDto[]> {
    return this.productService.findProducts();
  }

  @Post()
  @ApiResponse({ type: ProductDto, status: HttpStatus.CREATED })
  @ApiBody({ type: ProductCreateDto })
  async createProduct(@Body() dto: ProductCreateDto): Promise<ProductDto> {
    return this.productService.createProduct(dto);
  }

  @Put(':id')
  @ApiBody({ type: ProductUpdateDto })
  @ApiResponse({ type: ProductDto, status: HttpStatus.OK })
  async updateProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ProductUpdateDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct({ id }, dto);
  }

  @Delete(':id')
  @ApiResponse({ type: ProductDto, status: HttpStatus.OK })
  async deleteProduct(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ProductDto> {
    return this.productService.deleteProduct({ id });
  }
}
