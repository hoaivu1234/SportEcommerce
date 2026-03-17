import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  seed: number;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<{ id: number; qty: number }>();
  @Output() remove = new EventEmitter<number>();

  decreaseQty() {
    if (this.item.quantity > 1) {
      this.quantityChange.emit({ id: this.item.id, qty: this.item.quantity - 1 });
    }
  }

  increaseQty() {
    this.quantityChange.emit({ id: this.item.id, qty: this.item.quantity + 1 });
  }

  removeItem() {
    this.remove.emit(this.item.id);
  }

  get lineTotal(): number {
    return this.item.price * this.item.quantity;
  }
}
