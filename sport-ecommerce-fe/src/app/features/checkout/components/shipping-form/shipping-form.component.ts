import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css',
})
export class ShippingFormComponent {
  @Output() formValid = new EventEmitter<boolean>();

  form: FormGroup;

  deliveryOptions = [
    { id: 'standard', label: 'Standard', desc: '2–3 Business Days', price: 0, selected: true },
    { id: 'express', label: 'Express', desc: '1–2 Business Days', price: 15, selected: false },
    { id: 'nextday', label: 'Next Day', desc: 'Delivered Tomorrow', price: 25, selected: false },
  ];

  selectedDelivery = 'standard';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      apt: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      saveAddress: [false],
    });
  }

  selectDelivery(id: string) {
    this.selectedDelivery = id;
  }

  get deliveryPrice(): number {
    const opt = this.deliveryOptions.find(o => o.id === this.selectedDelivery);
    return opt ? opt.price : 0;
  }
}
