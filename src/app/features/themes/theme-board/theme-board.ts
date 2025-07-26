import { Component, inject } from '@angular/core';
import { AuthService, PostsService, ThemesService } from '../../../core/services';
import { Post, Theme } from '../../../models';
import { ThemeItem } from "../theme-item/theme-item";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PostItem } from '../../post/index';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem, CommonModule, PostItem, RouterLink],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard{
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  theme$: Observable<Theme[]>;
  posts$: Observable<Post[]>;

  constructor(private themeService: ThemesService, 
    private postService: PostsService) { 
    this.theme$ = this.themeService.getThemes();
    this.posts$ = this.postService.getPosts();
  }
}
