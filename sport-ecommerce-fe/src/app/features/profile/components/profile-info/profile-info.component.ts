import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent {
  form: FormGroup;
  saved = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['Marcus', Validators.required],
      lastName: ['Sterling', Validators.required],
      email: ['marcus.sterling@athletes.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
    });
  }

  onSave() {
    if (this.form.valid) {
      this.saved = true;
      setTimeout(() => this.saved = false, 3000);
    }
  }
}
