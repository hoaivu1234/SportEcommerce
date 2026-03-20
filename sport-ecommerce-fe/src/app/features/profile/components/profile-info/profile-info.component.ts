import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { ToastService } from '../../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly storageService = inject(StorageService);
  private readonly userState = inject(UserStateService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
  });

  loading = false;
  saving = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    const cached = this.storageService.getUserInfo();
    if (cached) {
      this.form.patchValue({
        id: cached.id,
        firstName: cached.firstName ?? '',
        lastName: cached.lastName ?? '',
        phone: cached.phone ?? '',
      });
    }

    this.loading = true;
    this.userService.getProfile(cached?.id).subscribe({
      next: (res) => {
        const user = res.data;
        this.form.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone ?? '',
        });
        this.storageService.setUserInfo(user);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const { firstName, lastName, phone } = this.form.value;
    this.userService.updateProfile({ firstName, lastName, phone }, this.form.value.id).subscribe({
      next: (res) => {
        this.userState.setUser(res.data);
        this.toastService.success('Profile updated successfully!');
        this.saving = false;
      },
      error: (err: HttpErrorResponse) => {
        const msg = err.error?.resolvedMessage ?? 'Failed to update profile.';
        this.toastService.error(msg);
        this.saving = false;
      },
    });
  }
}
