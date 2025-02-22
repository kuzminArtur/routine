import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma.service';
import { RoutineService } from '../routine/routine.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, RoutineService],
})
export class ProductModule {}
