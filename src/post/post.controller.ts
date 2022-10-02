import { PostDto } from './post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  // Get all posts
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  index() {
    return this.postService.getAllPosts();
  }

  // Create a new post
  @Post()
  @ApiBody({ type: PostDto })
  @ApiOperation({ summary: 'Create a new post' })
  async createPost(@Body() postDto: PostDto) {
    return this.postService.createPost(postDto);
  }
  // Find post by id
  @Get(':id')
  @ApiOperation({ summary: 'Find post by id' })
  async findPostById(@Param('id') id: number) {
    return this.postService.findPostById(id);
  }

  // Update post
  @Put(':id')
  @ApiBody({ type: PostDto })
  @ApiOperation({ summary: 'Update a post by id' })
  async updatePost(@Param('id') id: number, @Body() postDto: PostDto) {
    return this.postService.updatePost(id, postDto);
  }

  // Delete post
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by id' })
  async deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
