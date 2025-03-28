import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from './entity/brand';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Post()
  async create(@Body('name') name: string): Promise<Brand> {
    return this.brandService.create(name);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Brand> {
    return this.brandService.update(+id, name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.brandService.delete(+id);
  }
}
