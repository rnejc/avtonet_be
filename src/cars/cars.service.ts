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
    private carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(createCarDto);
    return this.carRepository.save(newCar);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = this.carRepository.findOne({ where: { id: id } });
    if (!car) {
      throw new NotFoundException('Avto ne obstaja');
    }
    await this.carRepository.update(id, updateCarDto);
    return this.carRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
