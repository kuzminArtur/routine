import { Controller, Get, HttpStatus } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { DayPartDto, RoutineDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class RoutineController {
  constructor(private readonly routinesService: RoutineService) {}

  @Get('routine')
  @ApiResponse({ type: DayPartDto, isArray: true, status: HttpStatus.OK })
  async getRoutines(): Promise<RoutineDto[]> {
    // @ts-expect-error убрать после проверки api
    return this.routinesService.getRoutines();
  }

  @Get('day-parts')
  @ApiResponse({ type: DayPartDto, isArray: true, status: HttpStatus.OK })
  async getDayParts(): Promise<DayPartDto[]> {
    return this.routinesService.getDayParts();
  }
}
