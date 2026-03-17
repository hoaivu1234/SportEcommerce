import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  promoCode = '';
  items = [
    { name: 'SwiftRun Performance PR', detail: 'Size: US 10.5 · Qty: 1', price: 129.99, image: 'https://picsum.photos/seed/400/80/80' },
    { name: 'AeroLayer Windbreaker', detail: 'Size: Medium · Qty: 1', price: 85.00, image: 'https://picsum.photos/seed/403/80/80' },
  ];
  get subtotal() { return this.items.reduce((s, i) => s + i.price, 0); }
  tax = 17.20;
  get total() { return this.subtotal + this.tax; }
}
