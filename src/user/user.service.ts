import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  // Create a new user
  async createUser(userDto: UserDto) {
    try {
      return await this.userRepository.save(userDto);
    } catch (e) {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    }
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
    await this.userRepository.update(user.id, userDto);
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
