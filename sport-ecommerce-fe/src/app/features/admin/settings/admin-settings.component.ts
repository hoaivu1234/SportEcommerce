import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ShippingSettingsComponent } from './components/shipping-settings/shipping-settings.component';

type SettingsNav = 'general' | 'payments' | 'shipping' | 'roles';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, GeneralSettingsComponent, ShippingSettingsComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css',
})
export class AdminSettingsComponent {
  activeNav = signal<SettingsNav>('general');

  navItems: { key: SettingsNav; label: string; icon: string }[] = [
    { key: 'general', label: 'General', icon: 'fa-store' },
    { key: 'payments', label: 'Payments', icon: 'fa-credit-card' },
    { key: 'shipping', label: 'Shipping', icon: 'fa-truck' },
    { key: 'roles', label: 'User Roles', icon: 'fa-shield-halved' },
  ];

  storeName = 'ActiveGear Official';
  contactEmail = 'support@activegear.com';
  address = '782 Sportive Ave, Portland, OR 97201, USA';
  currency = 'USD ($)';
  weightUnit = 'Kilograms (kg)';
  timezone = 'UTC-8 (Pacific Time)';
}
