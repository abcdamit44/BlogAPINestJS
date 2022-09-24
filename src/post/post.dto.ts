import { IsNotEmpty } from 'class-validator';

export class PostDto {
  id: number;

  created_at: Date;

  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  description: string;
}
