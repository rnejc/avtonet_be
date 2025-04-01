import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../../brands/entity/brand';
import { User } from '../../users/entity/user.entity';

@Entity('cars') // Table name
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', comment: 'Year of manufacture (YYYY)' })
  year: number;

  @Column()
  model: string;

  @Column({ comment: 'Mileage in kilometers (km)' })
  mileage: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    comment: 'Engine displacement in liters (L)',
  })
  engineDisplacement: number;

  @Column()
  fuelType: string;

  @Column()
  transmission: string;

  @Column()
  color: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    comment: 'Fuel consumption in liters per 100 km (L/100km)',
  })
  fuelConsumption: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.cars, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => User, (user) => user.cars, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
