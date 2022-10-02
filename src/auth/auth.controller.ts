import { User } from './../user/user.entity';
import { UserDto } from './../user/user.dto';
import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
