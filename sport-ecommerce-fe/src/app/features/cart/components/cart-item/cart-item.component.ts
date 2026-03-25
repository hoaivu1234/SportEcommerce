import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItemResponse } from '../../../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() item!: CartItemResponse;
  @Output() quantityChange = new EventEmitter<{ id: number; qty: number }>();
  @Output() remove         = new EventEmitter<number>();

  decrease(): void {
    if (this.item.quantity > 1) {
      this.quantityChange.emit({ id: this.item.id, qty: this.item.quantity - 1 });
    }
  }

  increase(): void {
    this.quantityChange.emit({ id: this.item.id, qty: this.item.quantity + 1 });
  }

  onRemove(): void {
    this.remove.emit(this.item.id);
  }

  get lineTotal(): number {
    return this.item.subtotal;
  }
}
