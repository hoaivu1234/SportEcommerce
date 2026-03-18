import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  form: FormGroup;
  showPassword = false;
  showConfirm = false;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  payload = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit() {
    if (this.form.valid) {
      this.payload.firstName = this.form.value.firstName;
      this.payload.lastName = this.form.value.lastName;
      this.payload.email = this.form.value.email;
      this.payload.password = this.form.value.password;
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.register(this.payload).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            err?.error?.message ?? 'Registration failed. Please try again.',
          );
        },
        complete: () => this.isLoading.set(false),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
