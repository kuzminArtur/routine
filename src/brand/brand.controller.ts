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
import { BrandService } from './brand.service';
import { Brand } from '@prisma/client';
import { BrandCreateDto, BrandUpdateDto } from './dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get(':id')
  async getBrand(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Brand | null> {
    return this.brandService.getBrand({ id });
  }

  @Get()
  async getBrands(): Promise<Brand[]> {
    return this.brandService.findBrands();
  }

  @Post()
  @ApiBody({ type: BrandCreateDto })
  async createBrand(@Body() dto: BrandCreateDto): Promise<Brand> {
    return this.brandService.createBrand(dto);
  }

  @Put(':id')
  @ApiBody({ type: BrandUpdateDto })
  async updateBrand(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: BrandUpdateDto,
  ): Promise<Brand> {
    return this.brandService.updateBrand({ id }, dto);
  }

  @Delete(':id')
  async deleteBrand(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Brand> {
    return this.brandService.deleteBrand({ id });
  }
}
