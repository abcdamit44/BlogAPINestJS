import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  created_at: Date;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string;
}
