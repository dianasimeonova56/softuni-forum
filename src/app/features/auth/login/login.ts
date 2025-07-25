import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passwordError: boolean = false;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  validateEmail(): void {
    if(!this.email) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is required';
    } else if(!this.isValidEmail(this.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is not valid';
    } else {
      this.emailError = false;
      this.emailErrorMessage = ''; 
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = "Password is required";
    } else if(this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = "Password must be at least 4 chars";
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return Boolean(this.email) && Boolean(this.password) && !this.emailError && !this.passwordError;
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePassword();

    if(this.isFormValid()) {
      const response = this.authService.login(this.email, this.password);

      if (response) {
        this.router.navigate(['/home']);
      }
    } 
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}
