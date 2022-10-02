import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // Get all users
  async getAllUsers() {
    return await this.userRepository.find();
  }

  // Find a user
  async findUserById(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
    return user;
  }

  // Update a user
  async updateUser(id: number, userDto: UserDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
    if (!user) {
      return { message: 'User does not exist' };
    }
    user.password = await argon2.hash(userDto.password);
    const userObj = {
      name: userDto.name,
      email: userDto.email,
      password: await argon2.hash(userDto.password),
    };
    await this.userRepository.update(user.id, userObj);
    return { message: 'User updated successfully' };
  }

  // Delete a user
  async deleteUser(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
    if (!user) {
      return { message: 'User does not exist' };
    }
    await this.userRepository.delete(user.id);
    return { message: 'User deleted successfully' };
  }
}
