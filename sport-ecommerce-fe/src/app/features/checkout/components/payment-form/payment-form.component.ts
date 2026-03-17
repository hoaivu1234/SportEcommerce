import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent {
  activeTab: 'card' | 'paypal' | 'apple' = 'card';
  form: FormGroup;
  showCvv = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}(\s\d{4}){3}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  setTab(tab: 'card' | 'paypal' | 'apple') {
    this.activeTab = tab;
  }

  toggleCvv() {
    this.showCvv = !this.showCvv;
  }

  formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    input.value = val;
    this.form.get('cardNumber')?.setValue(val, { emitEvent: false });
  }
}
