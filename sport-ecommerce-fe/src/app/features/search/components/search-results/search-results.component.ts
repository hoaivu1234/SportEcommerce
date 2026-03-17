import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

export interface SearchProduct {
  id: number;
  name: string;
  price: number;
  seed: number;
  rating: number;
  badge?: string;
}

@Component({
  selector: 'app-search-results-grid',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsGridComponent {
  @Input() products: SearchProduct[] = [];
  @Input() query = '';

  currentPage = 1;
  totalPages = 5;

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

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
