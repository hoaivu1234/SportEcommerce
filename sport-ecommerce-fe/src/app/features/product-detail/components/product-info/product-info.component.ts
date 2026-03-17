import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SizeSelectorComponent } from '../size-selector/size-selector.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, SizeSelectorComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  product = {
    name: 'SWIFT RUNNER X CARBON ELITE',
    price: 185.00,
    rating: 4.5,
    reviewCount: 248,
    category: 'Running Footwear',
  };

  colors = [
    { name: 'Midnight Black', value: '#1a1a1a', selected: true },
    { name: 'Arctic White', value: '#f0f0f0', selected: false },
    { name: 'Flame Orange', value: '#e8521a', selected: false },
    { name: 'Ocean Blue', value: '#1a6ae8', selected: false },
  ];

  selectedSize = 'UK 9';
  quantity = 1;
  isWishlisted = false;

  get stars(): ('full' | 'half' | 'empty')[] {
    const result: ('full' | 'half' | 'empty')[] = [];
    const val = this.product.rating;
    for (let i = 1; i <= 5; i++) {
      if (val >= i) result.push('full');
      else if (val >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  }

  selectColor(color: any) {
    this.colors.forEach(c => c.selected = false);
    color.selected = true;
  }

  onSizeSelected(size: string) {
    this.selectedSize = size;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  increaseQty() {
    this.quantity++;
  }

  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
  }
}
