import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  created_by: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn()
  user: User;
}
