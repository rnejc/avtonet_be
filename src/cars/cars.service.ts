import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car';
import { Repository } from 'typeorm';
import {CreateCarDto} from "./entities/create-car.dto";
import {UpdateCarDto} from "./entities/update-car.dto";

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

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = this.carsRepository.findOne({ where: { id: id } });
    if (!car) {
      throw new NotFoundException('Avto ne obstaja');
    }
    await this.carsRepository.update(id, updateCarDto);
    return this.carsRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.carsRepository.delete(id);
  }
}
