import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars') //ime tabele
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', comment: 'Year of manufacture (YYYY)' })
  year: number;

  @Column()
  model: string;

  @Column({ comment: 'Mileage in kilometers (km)' })
  mileage: number;

  @Column({ type: 'decimal', precision: 3, scale: 1,
            comment: 'Engine displacement in liters (L)'
  })
  engineDisplacement: number;

  @Column()
  fuelType: string;

  @Column()
  transmission: string;

  @Column()
  color: string;

  @Column({ type: 'decimal', precision: 3, scale: 1,
            comment: 'Fuel consumption in liters per 100 km (L/100km)'
  })
  fuelConsumption: number;
}
