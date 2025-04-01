import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car';
import { UsersModule } from '../users/users.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), UsersModule, AwsModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
