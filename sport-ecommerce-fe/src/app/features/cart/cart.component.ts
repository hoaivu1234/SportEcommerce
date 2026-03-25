import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { CartStateService } from './services/cart-state.service';

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
export class CartComponent implements OnInit {
  readonly cartState = inject(CartStateService);

  ngOnInit(): void {
    // Refresh on every visit to ensure cart is current
    this.cartState.load();
  }

  onQuantityChange(event: { id: number; qty: number }): void {
    this.cartState.updateQuantity(event.id, event.qty);
  }

  onRemove(itemId: number): void {
    this.cartState.removeItem(itemId);
  }
}
