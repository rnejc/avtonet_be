import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Brand } from "./entity/brand";
import {BrandsController} from "./brands.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
