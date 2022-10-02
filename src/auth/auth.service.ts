import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserDto } from './../user/user.dto';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Find user by email
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.authRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  // Generate token
  async generateToken(userId: number, email: string, type: string) {
    const payload = {
      sub: userId,
      email: email,
      type: type,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: `${process.env.JWT_SECRET}`,
      expiresIn: `${process.env.JWT_EXPIRE.toString()}`,
    });
    return token;
  }

  // This method is used for signin
  async signinLocal(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.getUserByEmail(email);
    const isVerified = await argon2.verify(user.password, password);
    if (!isVerified) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.generateToken(user.id, user.email, 'access');
  }

  async signupLocal(userDto: UserDto) {
    // Sign up a new user
    console.log('Hello');
    try {
      const user = this.authRepository.create(userDto);
      user.password = await argon2.hash(userDto.password);
      this.authRepository.save(user);
      return { message: 'User Has been created successfully' };
    } catch (e) {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    }
  }
}
