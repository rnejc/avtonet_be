import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars') //ime tabele
export class Car {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  year: Date;
  @Column()
  model: string;
  @Column()
  mileage: number;
  @Column()
  engineDisplacement: number;
  @Column()
  fuelType: string;
  @Column()
  transmission: string;
  @Column()
  color: string;
  @Column()
  fuelConsumption: number;
}
