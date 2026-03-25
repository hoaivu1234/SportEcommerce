import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingAddressRequest } from '../../../../models/order.model';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css',
})
export class ShippingFormComponent implements OnInit {
  /** Emits the validated address whenever the form changes. Null when invalid. */
  @Output() addressChange = new EventEmitter<ShippingAddressRequest | null>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName:    ['', [Validators.required, Validators.maxLength(200)]],
      phone:       ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,20}$/)]],
      addressLine: ['', [Validators.required, Validators.maxLength(255)]],
      ward:        ['', [Validators.required, Validators.maxLength(100)]],
      district:    ['', [Validators.required, Validators.maxLength(100)]],
      province:    ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.form.valueChanges.subscribe(() => {
      this.addressChange.emit(this.form.valid ? this.form.value : null);
    });
  }

  /** Mark all controls touched so validation messages show on submit attempt. */
  markAllTouched(): void {
    this.form.markAllAsTouched();
    this.addressChange.emit(this.form.valid ? this.form.value : null);
  }

  get f() { return this.form.controls; }
}
