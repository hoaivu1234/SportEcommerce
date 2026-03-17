import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingProductCardComponent, ListingProduct } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ListingProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  @Input() products: ListingProduct[] = [];
  @Input() viewMode: 'grid' | 'list' = 'grid';

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
}
