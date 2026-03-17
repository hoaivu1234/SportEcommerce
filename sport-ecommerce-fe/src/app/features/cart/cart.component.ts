import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemComponent, CartItem } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    CartItemComponent,
    CartSummaryComponent,
    EmptyCartComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items: CartItem[] = [
    {
      id: 1,
      name: 'Swift-Run Pro Performance',
      price: 129.99,
      size: 'US 10.5',
      color: 'Black/Blue',
      quantity: 1,
      seed: 400,
    },
    {
      id: 2,
      name: 'Compression Aero-V Tee',
      price: 45.00,
      size: 'M',
      color: 'Carbon Black',
      quantity: 2,
      seed: 401,
    },
    {
      id: 3,
      name: 'Apex Training Shorts 7"',
      price: 38.50,
      size: 'L',
      quantity: 1,
      seed: 402,
    },
  ];

  recommendedProducts = [
    { id: 1, name: 'Velocity Pro Runner X3', price: 189.99, seed: 410 },
    { id: 2, name: 'Elite Run Socks 3-Pack', price: 18.99, seed: 411 },
    { id: 3, name: 'AeroFit Training Vest', price: 75.00, seed: 412 },
    { id: 4, name: 'Grip-Pro Lifting Gloves', price: 32.50, seed: 413 },
  ];

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  onQuantityChange(event: { id: number; qty: number }) {
    const item = this.items.find(i => i.id === event.id);
    if (item) item.quantity = event.qty;
  }

  onRemove(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }
}
