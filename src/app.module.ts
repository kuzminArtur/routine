import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { RoutineModule } from './routine/routine.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ProductModule, BrandModule, RoutineModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
