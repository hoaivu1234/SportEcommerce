import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  seed: number;
  rating: number;
}

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
  products: RelatedProduct[] = [
    { id: 1, name: 'Velocity Pro Runner X3', price: 189.99, seed: 200, rating: 4.5 },
    { id: 2, name: 'Aero Boost Training Shoe', price: 149.00, seed: 201, rating: 4.3 },
    { id: 3, name: 'Titanium Sprint Elite', price: 220.00, seed: 202, rating: 4.7 },
    { id: 4, name: 'CloudStep Lite Runner', price: 135.00, seed: 203, rating: 4.2 },
  ];

  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const result: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) result.push('full');
      else if (rating >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  }
}
