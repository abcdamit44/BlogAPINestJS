import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  //Create User
  @Post()
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }

  // Find User
  @Get('/:id')
  @ApiOperation({ summary: 'Find user by id' })
  async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  // Update User
  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UserDto })
  async updateUser(@Param('id') id: number, @Body() userDto: UserDto) {
    return await this.userService.updateUser(id, userDto);
  }
  // Delete User
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
