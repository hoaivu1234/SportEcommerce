import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrderService } from '../services/order.service';
import { OrderSummaryResponse } from '../../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent implements OnInit {
  private readonly orderSvc   = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);

  orders    = signal<OrderSummaryResponse[]>([]);
  isLoading = signal(true);
  error     = signal<string | null>(null);
  page      = signal(0);
  totalPages = signal(0);
  readonly pageSize = 10;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.orderSvc.getMyOrders(this.page(), this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.orders.set(res.data.content);
          this.totalPages.set(res.data.totalPages);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load orders.');
          this.isLoading.set(false);
        },
      });
  }

  goToPage(p: number): void {
    this.page.set(p);
    this.loadOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  statusClass(status: string): string {
    return {
      PENDING:   'badge--warning',
      CONFIRMED: 'badge--info',
      SHIPPED:   'badge--primary',
      COMPLETED: 'badge--success',
      CANCELLED: 'badge--danger',
    }[status] ?? 'badge--default';
  }
}
