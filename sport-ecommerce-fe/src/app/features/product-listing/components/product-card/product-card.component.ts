import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ListingProduct {
  id: number;
  name: string;
  price: number;
  badge?: 'Sale' | 'New';
  seed: number;
  rating: number;
}

@Component({
  selector: 'app-listing-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ListingProductCardComponent {
  @Input() product!: ListingProduct;

  get imageUrl(): string {
    return `https://picsum.photos/seed/${this.product.seed}/400/400`;
  }

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
}
