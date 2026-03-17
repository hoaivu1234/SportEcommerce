import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent {
  @Input() subtotal = 0;

  promoCode = '';
  promoApplied = false;
  promoDiscount = 0;

  get shipping(): number {
    return this.subtotal >= 100 ? 0 : 9.99;
  }

  get tax(): number {
    return this.subtotal * 0.219;
  }

  get total(): number {
    return this.subtotal + this.shipping + this.tax - this.promoDiscount;
  }

  applyPromo() {
    if (this.promoCode.toUpperCase() === 'SPORT10') {
      this.promoApplied = true;
      this.promoDiscount = this.subtotal * 0.1;
    }
  }
}
