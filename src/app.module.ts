import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [ProductModule, BrandModule, RoutineModule],
})
export class AppModule {}
