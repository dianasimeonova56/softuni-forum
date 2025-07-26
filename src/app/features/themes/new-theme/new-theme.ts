import { Component, inject } from '@angular/core';
import { AuthService, PostsService } from '../../../core/services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-theme',
  imports: [FormsModule],
  templateUrl: './new-theme.html',
  styleUrl: './new-theme.css'
})
export class NewTheme {
  private authServcie = inject(AuthService);
  private router = inject(Router);
  private postService = inject(PostsService)

  themeName: string = "";
  postText: string = "";
  themeNameError: boolean = false;
  postTextError: boolean = false;
  postTextErrorMessage: string = "";
  themeNameErrorMessage: string = "";

  validateThemeName(): void {
    if (!this.themeName) {
      this.themeNameError = true;
      this.themeNameErrorMessage = "theme name is required";
    } else if (this.themeName.length < 5) {
      this.themeNameError = true;
      this.themeNameErrorMessage = "Theme name must be at least 5 chars";
    } else {
      this.themeNameError = false;
      this.themeNameErrorMessage = '';
    }
  }

  validatePostText(): void {
    if (!this.postText) {
      this.postTextError = true;
      this.postTextErrorMessage = "Post text name is required";
    } else if (this.postText.length < 10) {
      this.postTextError = true;
      this.postTextErrorMessage = "Postt text must be at least 10 chars";
    } else {
      this.postTextError = false;
      this.postTextErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return Boolean(this.themeName) && Boolean(this.postText) &&
    !this.themeNameError && !this.postTextError
  }

  onCancel(): void {
    this.router.navigate(['/home'])
  }

  onSubmit(): void {
    this.validatePostText();
    this.validateThemeName();

    if(this.isFormValid()) {
      const newTheme = {
        themeName: this.themeName,
        postText: this.postText,
        userId: this.authServcie.getCurrentUserId()
      }

      setTimeout(() => {
        this.router.navigate(['/themes']);
      }, 500)
      // const response = this.postService.createPost(this.themeName, this.postText);

      // response.subscribe((post: Post) => {
      //   if(post) {
      //     this.router.navigate(['/themes']);
      //   }
      // })
    }
  }
}
