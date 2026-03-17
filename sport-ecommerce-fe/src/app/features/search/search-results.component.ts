import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilterSidebarComponent } from '../product-listing/components/filter-sidebar/filter-sidebar.component';
import { SearchResultsGridComponent, SearchProduct } from './components/search-results/search-results.component';
import { NoResultsComponent } from './components/no-results/no-results.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule,
    RouterLink,
    FilterSidebarComponent,
    SearchResultsGridComponent,
    NoResultsComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  searchQuery = 'running shoes';
  totalResults = 4231;

  products: SearchProduct[] = [
    { id: 1, name: 'Velocity Pro Runner X3', price: 189.99, seed: 300, rating: 4.5, badge: 'Sale' },
    { id: 2, name: 'Swift Air Runner 2.0', price: 149.00, seed: 301, rating: 4.3 },
    { id: 3, name: 'Titanium Speed Elite', price: 220.00, seed: 302, rating: 4.7, badge: 'New' },
    { id: 4, name: 'CloudStep Lite Trail', price: 135.00, seed: 303, rating: 4.2 },
    { id: 5, name: 'Carbon Sprint Pro', price: 259.99, seed: 304, rating: 4.8 },
    { id: 6, name: 'Aero Flex Road Runner', price: 98.00, seed: 305, rating: 4.0 },
    { id: 7, name: 'UltraGrip Trail Shoe', price: 175.00, seed: 306, rating: 4.4 },
    { id: 8, name: 'ZenRun Barefoot Trainer', price: 115.00, seed: 307, rating: 4.1 },
    { id: 9, name: 'EcoStride Recycled Runner', price: 89.99, seed: 308, rating: 3.9 },
  ];

  recommendedProducts: SearchProduct[] = [
    { id: 10, name: 'Running Socks 3-Pack', price: 18.99, seed: 309, rating: 4.5 },
    { id: 11, name: 'Compression Run Tights', price: 79.00, seed: 310, rating: 4.6 },
    { id: 12, name: 'Hydration Run Vest', price: 65.00, seed: 311, rating: 4.3 },
    { id: 13, name: 'Sport Sunglasses UV400', price: 45.00, seed: 312, rating: 4.4 },
  ];

  hasResults = true;

  onSearch() {
    // Simulate search
    this.hasResults = this.searchQuery.trim().length > 0;
  }
}
