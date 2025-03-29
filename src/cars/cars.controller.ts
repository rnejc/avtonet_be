import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car';
import { CreateCarDto } from './entities/create-car.dto';
import { UpdateCarDto } from './entities/update-car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createCarDto: CreateCarDto,
    @Request() req,
  ): Promise<Car> {
    return this.carService.create(createCarDto, req.user.userId);
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
