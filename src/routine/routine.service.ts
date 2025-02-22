import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DayPart, Prisma } from '@prisma/client';

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

  async getDayParts(where?: Prisma.DayPartWhereInput): Promise<DayPart[]> {
    return this.prisma.dayPart.findMany({ where });
  }
}
