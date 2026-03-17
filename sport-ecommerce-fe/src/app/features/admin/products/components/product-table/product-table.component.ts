import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  allChecked = false;

  products = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/600/48/48',
      name: 'Apex Velocity Running Shoes',
      category: 'Footwear',
      sku: 'AG-AV-992',
      price: '$129.99',
      stock: 42,
      stockMax: 100,
      stockClass: 'green',
      status: 'Active',
      statusClass: 'badge-active',
      checked: false
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/601/48/48',
      name: 'Quantum Compression Tee',
      category: 'Apparel',
      sku: 'AG-QC-412',
      price: '$45.00',
      stock: 8,
      stockMax: 100,
      stockClass: 'orange',
      status: 'Low Stock',
      statusClass: 'badge-low-stock',
      checked: false
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/602/48/48',
      name: 'Titanium Strength Kettlebell',
      category: 'Equipment',
      sku: 'AG-TS-20K',
      price: '$89.00',
      stock: 15,
      stockMax: 100,
      stockClass: 'green',
      status: 'Active',
      statusClass: 'badge-active',
      checked: false
    },
    {
      id: 4,
      image: 'https://picsum.photos/seed/603/48/48',
      name: 'AeroGlide Yoga Mat',
      category: 'Accessories',
      sku: 'AG-AY-001',
      price: '$35.50',
      stock: 0,
      stockMax: 100,
      stockClass: 'red',
      status: 'Sold Out',
      statusClass: 'badge-sold-out',
      checked: false
    },
    {
      id: 5,
      image: 'https://picsum.photos/seed/604/48/48',
      name: 'Peak Performance Shorts',
      category: 'Apparel',
      sku: 'AG-PP-882',
      price: '$38.00',
      stock: 124,
      stockMax: 150,
      stockClass: 'green',
      status: 'Draft',
      statusClass: 'badge-draft',
      checked: false
    },
  ];

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.allChecked = checked;
    this.products.forEach(p => p.checked = checked);
  }

  toggleOne() {
    this.allChecked = this.products.every(p => p.checked);
  }

  getStockPercent(stock: number, max: number): number {
    return Math.min(100, (stock / max) * 100);
  }
}
