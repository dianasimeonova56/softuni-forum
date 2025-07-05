import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services';
import { Post } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostItem } from '../post-item/post-item';

@Component({
  selector: 'app-post-board',
  imports: [PostItem],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.getPosts()
    .pipe(takeUntilDestroyed())
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
