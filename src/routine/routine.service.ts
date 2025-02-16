import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DayPart } from '@prisma/client';

@Injectable()
export class RoutineService {
  constructor(private prisma: PrismaService) {}

  async getRoutines(): Promise<DayPart[]> {
    return this.prisma.dayPart.findMany({
      include: {
        products: true,
      },
      where: {
        products: {
          some: {},
        },
      },
    });
  }

  async getDayParts(): Promise<DayPart[]> {
    return this.prisma.dayPart.findMany();
  }
}
