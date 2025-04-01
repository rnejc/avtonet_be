import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'Email is required. ' })
  @IsEmail({}, { message: 'Invalid email format. ' })
  email: string;

  @IsNotEmpty({ message: 'Password is required. ' })
  @IsStrongPassword(
    {},
    {
      message:
        'Password is too weak. It must contain a combination of letters, numbers, and special characters. ',
    },
  )
  password: string;

  @IsString({ message: 'First name must be a string. ' })
  @IsNotEmpty({ message: 'First name is required. ' })
  firstName: string;

  @IsString({ message: 'Last name must be a string. ' })
  @IsNotEmpty({ message: 'Last name is required. ' })
  lastName: string;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string. ' })
  avatar?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Phone number is invalid. ' })
  phoneNumber?: number;
}
