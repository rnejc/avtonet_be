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
    return this.carRepository.find({
      relations: ['brand', 'user'],
    });
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({
      where: { id },
      relations: ['brand', 'user'],
    });
  }

  async create(createCarDto: CreateCarDto, userId: number): Promise<Car> {
    const user = await this.userService.findById(userId);

    const newCar = this.carRepository.create({
      ...createCarDto,
      user,
      image: createCarDto.image || null, // Ensure image is properly set
    });

    return this.carRepository.save(newCar);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException("Car doesn't exist");
    }

    const updatedCar = {
      ...car,
      ...updateCarDto,
      image: updateCarDto.image || car.image, // Keep existing image if not provided
    };

    await this.carRepository.save(updatedCar);
    return updatedCar;
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
