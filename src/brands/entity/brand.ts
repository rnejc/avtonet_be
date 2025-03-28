import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../cars/entities/car';

@Entity('brands') // Table name
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];
}
