import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  created_at: Date;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
