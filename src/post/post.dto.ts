import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  id: number;

  created_at: Date;

  created_by: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ type: String, nullable: true })
  description: string;
}
