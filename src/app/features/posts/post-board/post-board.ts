import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services';
import { Post } from '../../../models';
import { PostItem } from '../post-item/post-item';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-board',
  imports: [PostItem, CommonModule],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard{
  subscriptions: Subscription[] = [];
  posts: Post[] = [];
  post$: Observable<Post[]>;

  constructor(private postService: PostsService) {
    this.post$ = this.postService.getPosts();
   }
}
