import { Controller, Get } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { DayPart } from '@prisma/client';

@Controller()
export class RoutineController {
  constructor(private readonly routinesService: RoutineService) {}

  @Get('routine')
  async getRoutines(): Promise<DayPart[]> {
    return this.routinesService.getRoutines();
  }

  @Get('day-parts')
  async getDayParts(): Promise<DayPart[]> {
    return this.routinesService.getDayParts();
  }
}
