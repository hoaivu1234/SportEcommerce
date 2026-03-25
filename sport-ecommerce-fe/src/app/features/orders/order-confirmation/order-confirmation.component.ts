import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrderService } from '../services/order.service';
import { OrderResponse } from '../../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit {
  private readonly route      = inject(ActivatedRoute);
  private readonly orderSvc   = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);

  order     = signal<OrderResponse | null>(null);
  isLoading = signal(true);
  error     = signal<string | null>(null);

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber') ?? '';
    this.orderSvc.getOrderByNumber(orderNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.order.set(res.data);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Order not found.');
          this.isLoading.set(false);
        },
      });
  }
}
