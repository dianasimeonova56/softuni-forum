import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  rePassword: string = '';

  usernameError: boolean = false;
  emailError: boolean = false;
  phoneError: boolean = false;
  passwordError: boolean = false;
  rePasswordError: boolean = false;

  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  phoneErrorMessage: string = '';
  rePasswordErrorMessage: string = '';

  validateUsername(): void {
    if (!this.username) {
      this.usernameError = true;
      this.usernameErrorMessage = 'Username is required';
    } else {
      this.usernameError = false;
      this.usernameErrorMessage = '';
    }
  }

  validateEmail(): void {
    if (!this.email) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is not valid';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

  validatePhone(): void {
    if (!this.phone) {
      this.phoneError = true;
      this.phoneErrorMessage = 'Phone is required';
    } else if (!this.isValidPhone(this.phone)) {
      this.phoneError = true;
      this.phoneErrorMessage = 'Email is not valid';
    } else {
      this.phoneError = false;
      this.phoneErrorMessage = '';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = "Password is required";
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = "Password must be at least 4 chars";
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }

    if (this.rePassword) { //check passowrd if changed
      this.validatePassword();
    }
  }

  validateRePassword(): void {
    if (!this.rePassword) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = "Password is required";
    } else if (this.rePassword !== this.password) {
      this.rePasswordError = true;
      this.rePasswordErrorMessage = "Passwords must match";
    } else {
      this.rePasswordError = false;
      this.rePasswordErrorMessage = '';
    }
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePassword();
    this.validateUsername();
    this.validatePhone();
    this.validateRePassword();

    if (this.isFormValid()) {
      const response = this.authService.register(this.username,
        this.email, this.phone, this.password, this.rePassword);

      if (response) {
        this.router.navigate(['/home']);
      }
    }
  }

  isFormValid(): boolean {
    return Boolean(this.email) &&
      Boolean(this.username) &&
      Boolean(this.phone) &&
      Boolean(this.password) &&
      Boolean(this.rePassword) &&
      !this.usernameError &&
      !this.emailError &&
      !this.phoneError &&
      !this.rePasswordError &&
      !this.passwordError;
  }


  private isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
  }
}

