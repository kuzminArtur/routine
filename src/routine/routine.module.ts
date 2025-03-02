import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RoutineController],
  providers: [RoutineService, PrismaService],
})
export class RoutineModule {}
