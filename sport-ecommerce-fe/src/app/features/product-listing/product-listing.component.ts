import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ListingProduct } from './components/product-card/product-card.component';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    FilterSidebarComponent,
    SortBarComponent,
    ProductGridComponent,
  ],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css',
})
export class ProductListingComponent {
  viewMode: 'grid' | 'list' = 'grid';
  email = '';

  products: ListingProduct[] = [
    { id: 1, name: 'Velocity Pro Runner X3', price: 189.99, badge: 'Sale', seed: 10, rating: 4.5 },
    { id: 2, name: 'Aerowide Training Shorts', price: 45.00, seed: 20, rating: 4.0 },
    { id: 3, name: 'Titanium Flex Gym Jacket', price: 155.00, badge: 'New', seed: 30, rating: 4.8 },
    { id: 4, name: 'Pulse Ultra Smart Watch', price: 299.00, seed: 40, rating: 4.3 },
    { id: 5, name: 'County Shield Basketballs', price: 65.00, seed: 50, rating: 4.1 },
    { id: 6, name: 'ZenFlex Yoga Mat 9mm', price: 78.00, badge: 'New', seed: 60, rating: 4.6 },
    { id: 7, name: 'StormBreaker Windrunner', price: 145.00, seed: 70, rating: 4.2 },
    { id: 8, name: 'Gripmaster Lifting Straps', price: 24.99, badge: 'Sale', seed: 80, rating: 4.7 },
  ];

  onViewModeChange(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  subscribeNewsletter() {
    this.email = '';
  }
}
