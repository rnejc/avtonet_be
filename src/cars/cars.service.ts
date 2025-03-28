import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car';
import { Repository } from 'typeorm';
import {CreateCarDto} from "./entities/create-car.dto";

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(newCar);
  }
}
