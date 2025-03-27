import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }
}
