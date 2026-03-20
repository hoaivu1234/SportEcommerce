import { inject, Injectable, signal } from '@angular/core';
import { StorageService, UserResponse } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly storage = inject(StorageService);

  private readonly _user = signal<UserResponse | null>(this.storage.getUserInfo());

  user = this._user.asReadonly();

  setUser(user: any) {
    this._user.set(user);
    this.storage.setUserInfo(user);
  }

  clearUser() {
    this._user.set(null);
    this.storage.clearTokens();
  }
}
