import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getAllPosts() {
    return await this.postRepository.find();
  }

  // Create a new Post
  async createPost(postDto: PostDto, currentUserId: number) {
    const post = this.postRepository.create(postDto);
    post.created_by = currentUserId;
    return await this.postRepository.save(post);
  }

  // Find a post
  async findPostById(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .getOne();
    return post;
  }

  // Update a post
  async updatePost(id: number, postDto: PostDto) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .getOne();
    if (!post) {
      return { message: 'post does not exist' };
    }
    await this.postRepository.update(post.id, postDto);
    return { message: 'post updated successfully' };
  }

  // Delete a post
  async deletePost(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .getOne();
    if (!post) {
      return { message: 'Post does not exist' };
    }
    await this.postRepository.delete(post.id);
    return { message: 'Post deleted successfully' };
  }
}
