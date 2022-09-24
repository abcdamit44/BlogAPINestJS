import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  index() {
    return 'Hello New Post';
  }
}
