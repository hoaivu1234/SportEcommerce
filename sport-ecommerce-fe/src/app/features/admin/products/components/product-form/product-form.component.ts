import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productName = '';
  description = '';
  sku = 'AG-SKU-123';
  vendorCode = 'ActiveGear Pro';
  costPrice = '';
  regularPrice = '';
  salePrice = '';
  trackQuantity = true;
  stopQty = 0;
  threshold = 5;
  isLive = true;
  featuredOnHomepage = false;
  disabled = false;
  category = '';
  subCategory = '';
  metaTitle = '';
  metaDescription = '';

  tags = ['Running', 'Performance', 'New Drop'];

  variants = [
    { name: 'Ignite Red', sku: 'AG-SKU-123-RED', price: '$129.99', stock: 10, status: 'Active' },
    { name: 'White', sku: 'AG-SKU-123-WHT', price: '$129.99', stock: 8, status: 'Active' },
    { name: 'Midnight Black', sku: 'AG-SKU-123-BLK', price: '$129.99', stock: 15, status: 'Active' },
  ];

  productImages = [
    'https://picsum.photos/seed/610/80/80',
    'https://picsum.photos/seed/611/80/80',
    'https://picsum.photos/seed/612/80/80',
  ];

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  tips = [
    { icon: 'fa-check-circle', color: '#22c55e', text: 'Add at least 3 high-quality product images for best results.' },
    { icon: 'fa-check-circle', color: '#22c55e', text: 'Fill in SEO metadata to improve discoverability.' },
    { icon: 'fa-exclamation-triangle', color: '#f59e0b', text: 'Variants missing price or stock will not be published.' },
  ];
}
