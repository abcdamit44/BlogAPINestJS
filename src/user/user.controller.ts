import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../common/authGuard/jwtAuthGuard.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiSecurity('JWT_auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
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
