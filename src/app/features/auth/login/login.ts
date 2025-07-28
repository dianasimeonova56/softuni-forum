import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get isPasswordValid(): boolean {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false;
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required';
    }
    if (this.email?.errors?.['pattern']) {
      return 'Email is not valid';
    }
    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required';
    }
    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 4 chars';
    }
    return '';
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      const response = this.authService.login(email, password);

      if (response) {
        this.router.navigate(['/home']);
      } else {
        this.markFormGroupTouched();
      }
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    })
  }

  // private isValidEmal(email: string): boolean {
    

  //   return emailRegex.test(email)
  // }
}

export function emailValidator(emailControl: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/;
  const email = emailControl.value;

  if(email && !emailRegex.test(email)) {
    return {emailValidator: true}
  }

  return null;
}
