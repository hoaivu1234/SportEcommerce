import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartResponse } from '../../../../models/cart.model';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  @Input() cart: CartResponse | null = null;
  @Input() isSubmitting = false;
  @Output() placeOrder = new EventEmitter<void>();
}
