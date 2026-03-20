import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductTableComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  router = inject(Router);

  searchQuery = '';

  miniStats = [
    { label: 'Total Products', value: '1,248', note: '+12 this month', noteClass: 'positive' },
    { label: 'Active Listings', value: '1,102', note: '92% of total', noteClass: 'info' },
    { label: 'Low Stock Alerts', value: '18', note: 'Requires action', noteClass: 'warning' },
    { label: 'Out of Stock', value: '4', note: 'Decreased from 7', noteClass: 'positive' },
  ];

  openModal() {
    this.router.navigate(['/admin/products/create']);
  }
}
