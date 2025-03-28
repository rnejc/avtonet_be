import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCarDto {
  @IsInt()
  @Min(1900) // Prevents invalid years
  @Max(new Date().getFullYear()) // Prevents future years
  year: number;

  @IsString()
  model: string;

  @IsNumber()
  mileage: number; // kilometers

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
  engineDisplacement: number; // liters

  @IsString()
  fuelType: string;

  @IsString()
  transmission: string;

  @IsString()
  color: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
  fuelConsumption: number; // liters per 100 km
}
