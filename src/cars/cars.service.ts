import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car';
import { Repository } from 'typeorm';
import { CreateCarDto } from './entities/create-car.dto';
import { UpdateCarDto } from './entities/update-car.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({
      where: { id },
      relations: ['brand'],
    });
  }

  async create(createCarDto: CreateCarDto, userId: number): Promise<Car> {
    const user = await this.userService.findById(userId);

    const newCar = this.carRepository.create({ ...createCarDto, user });
    return this.carRepository.save(newCar);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = this.carRepository.findOne({ where: { id: id } });
    if (!car) {
      throw new NotFoundException("Car doesn't exist");
    }
    await this.carRepository.update(id, updateCarDto);
    return this.carRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
