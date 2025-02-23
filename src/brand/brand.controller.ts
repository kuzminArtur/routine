import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandCreateDto, BrandDto, BrandUpdateDto } from './dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get(':id')
  @ApiResponse({ type: BrandDto, status: HttpStatus.OK })
  async getBrand(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<BrandDto | null> {
    return this.brandService.getBrand({ id });
  }

  @Get()
  @ApiResponse({ type: BrandDto, isArray: true, status: HttpStatus.OK })
  async getBrands(): Promise<BrandDto[]> {
    return this.brandService.findBrands();
  }

  @Post()
  @ApiBody({ type: BrandCreateDto })
  @ApiResponse({ type: BrandDto, status: HttpStatus.CREATED })
  async createBrand(@Body() dto: BrandCreateDto): Promise<BrandDto> {
    return this.brandService.createBrand(dto);
  }

  @Put(':id')
  @ApiBody({ type: BrandUpdateDto })
  @ApiResponse({ type: BrandDto, status: HttpStatus.OK })
  async updateBrand(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: BrandUpdateDto,
  ): Promise<BrandDto> {
    return this.brandService.updateBrand({ id }, dto);
  }

  @Delete(':id')
  @ApiResponse({ type: BrandDto, status: HttpStatus.OK })
  async deleteBrand(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<BrandDto> {
    return this.brandService.deleteBrand({ id });
  }
}
