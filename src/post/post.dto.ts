import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Timestamp } from 'typeorm';

export class PostDto {
  id: number;

  created_at: Date;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ type: 'string', nullable: true })
  description: string;
}
