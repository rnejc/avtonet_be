import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car } from './cars/entities/car';
import { CarsModule } from './cars/cars.module';
import { Brand } from './brands/entity/brand';
import { BrandsModule } from './brands/brands.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'avtonet',
      entities: [Car, Brand, User],
      synchronize: true,
    }),
    CarsModule,
    BrandsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
