import {Body, Controller, Get, Post} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car';
import {CreateCarDto} from "./entities/create-car.dto";

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }
}
