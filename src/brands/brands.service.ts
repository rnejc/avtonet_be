import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entity/brand';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async create(name: string): Promise<Brand> {
    const brand = this.brandRepository.create({ name: name });
    return this.brandRepository.save(brand);
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }

  async update(id: number, name: string): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id: id } });
    brand.name = name;
    return this.brandRepository.save(brand);
  }
}
