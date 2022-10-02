import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './../user/user.dto';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signin')
  async signinLocal(@Body() authDto: AuthDto) {
    return this.authService.signinLocal(authDto);
  }
  @Post('/local/signup')
  async signupLocal(@Body() userDto: UserDto) {
    return this.authService.signupLocal(userDto);
  }
}
