import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car';
import { CreateCarDto } from "./entities/create-car.dto";
import { UpdateCarDto } from "./entities/update-car.dto";

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

  @Patch(':id')
  async update(
      @Param('id') id: string,
      @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.carService.delete(+id);
  }
}
