import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent {
  categories = [
    { name: 'Footwear', products: 124, status: 'Active', statusClass: 'badge-active', visibility: 'Main Menu' },
    { name: 'Apparel', products: 86, status: 'Active', statusClass: 'badge-active', visibility: 'Main Menu' },
    { name: 'Accessories', products: 45, status: 'Draft', statusClass: 'badge-draft', visibility: 'Hidden' },
    { name: 'Equipment', products: 32, status: 'Active', statusClass: 'badge-active', visibility: 'Category Page' },
    { name: 'Wellness', products: 18, status: 'Active', statusClass: 'badge-active', visibility: 'Footer Only' },
  ];
}
