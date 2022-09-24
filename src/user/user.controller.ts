import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostDto } from 'src/post/post.dto';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Get all users
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  //Create User
  @Post()
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }

  // Find User
  @Get('/:id')
  async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  // Update User
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() userDto: UserDto) {
    return await this.userService.updateUser(id, userDto);
  }
  // Delete User
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
