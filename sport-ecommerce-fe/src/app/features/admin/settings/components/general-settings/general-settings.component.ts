import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent {
  storeName = 'ActiveGear Official';
  contactEmail = 'support@activegear.com';
  physicalAddress = '';
  currency = 'USD';
  weightUnit = 'kg';
  timezone = 'UTC-8';
}
