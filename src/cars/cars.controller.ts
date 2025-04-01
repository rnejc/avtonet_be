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
  Inject,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car';
import { CreateCarDto } from './entities/create-car.dto';
import { UpdateCarDto } from './entities/update-car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3 } from 'aws-sdk';

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(
    private readonly carService: CarsService,
    @Inject('S3') private s3: S3,
  ) {}

  @Post('presigned-image-upload')
  async getPresignedUploadUrl(@Request() req) {
    const key = `images/${req.user.userId}-${Date.now()}.jpeg`;
    const params = {
      Bucket: process.env['AWS_BUCKET_NAME'],
      Key: key,
      Expires: 60,
      ContentType: 'image/jpeg',
    };

    const uploadUrl = await this.s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env['AWS_BUCKET_NAME']}.s3.${process.env['AWS_REGION']}.amazonaws.com/${key}`;

    return { uploadUrl, fileUrl };
  }

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
