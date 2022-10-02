import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: 'string', description: 'Email address' })
  email: string;

  @ApiProperty({ type: 'string', description: 'Password' })
  password: string;
}
