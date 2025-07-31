import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder)

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
      phone: [''],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        rePassword: ['', [Validators.required, this.passwordMatchValidator]]
      })
    })
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username')
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email')
  }

  get phone(): AbstractControl<any, any> | null {
    return this.registerForm.get('phone')
  }

  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password')
  }

  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword')
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required';
    }
    if (this.username?.errors?.['minlength']) {
      return 'Username must be at least 5 chars';
    }
    return '';
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
    if (this.password?.errors?.['pattern']) {
      return 'Password is not valid'
    }
    if (this.password?.errors?.['passwordMismatch']) {
      return 'Passwords do not matcch'
    }
    return '';
  }

  get rePasswordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required';
    }
    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 4 chars';
    }
    if (this.password?.errors?.['passwordMismatch']) {
      return 'Passwords do not matcch'
    }
    return '';
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email, phone } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords
      this.authService.register(username,
        email, phone, password, rePassword).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log("Registration failed", err);
            this.markFormGroupTouched();
          }
        });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAsTouched();
      }
    })
  }

  private passwordMatchValidator(passowrdsControl: AbstractControl): ValidationErrors | null {
    const password = passowrdsControl.get('password');
    const rePassword = passowrdsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }

    return null
  }
}

