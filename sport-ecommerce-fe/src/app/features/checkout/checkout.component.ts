import { Component, DestroyRef, OnInit, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartStateService } from '../cart/services/cart-state.service';
import { OrderService } from '../orders/services/order.service';
import { ShippingAddressRequest } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ShippingFormComponent, PaymentFormComponent, OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly router      = inject(Router);
  readonly cartState           = inject(CartStateService);
  private readonly orderSvc    = inject(OrderService);
  private readonly destroyRef  = inject(DestroyRef);

  @ViewChild(ShippingFormComponent) shippingForm!: ShippingFormComponent;

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  private currentAddress: ShippingAddressRequest | null = null;

  ngOnInit(): void {
    // Ensure cart is fresh; CartStateService.load() guards against duplicate fetches
    this.cartState.load();
  }

  onAddressChange(address: ShippingAddressRequest | null): void {
    this.currentAddress = address;
  }

  onPlaceOrder(): void {
    // Trigger validation display if user clicked without filling the form
    this.shippingForm.markAllTouched();

    if (!this.currentAddress) {
      this.errorMessage.set('Please fill in all required shipping fields.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.orderSvc.placeOrder({ shippingAddress: this.currentAddress })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          // Server already cleared the cart; reflect that in the local state
          this.cartState.load();
          this.router.navigate(['/order-confirmation', res.data.orderNumber]);
        },
        error: (err: HttpErrorResponse) => {
          const msg = err.error?.resolvedMessage ?? 'Failed to place order. Please try again.';
          this.errorMessage.set(msg);
          this.isSubmitting.set(false);
        },
      });
  }
}
