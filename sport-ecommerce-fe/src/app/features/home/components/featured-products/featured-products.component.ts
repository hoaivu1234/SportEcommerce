import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent, ProductCard } from '../../../../shared/components/product-card/product-card.component';

type TabKey = 'all' | 'running' | 'training' | 'sports';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent {
  activeTab = signal<TabKey>('all');

  tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'running', label: 'Running' },
    { key: 'training', label: 'Training' },
    { key: 'sports', label: 'Team Sports' },
  ];

  allProducts: (ProductCard & { tags: TabKey[] })[] = [
    {
      id: 1,
      name: 'Pro Runner X3 Shoes',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      category: 'Running',
      rating: 4.5,
      reviewCount: 238,
      badge: 'SALE',
      tags: ['all', 'running'],
    },
    {
      id: 2,
      name: 'Compression Running Tights',
      price: 74.99,
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80',
      category: 'Running',
      rating: 4,
      reviewCount: 112,
      badge: 'NEW',
      tags: ['all', 'running', 'training'],
    },
    {
      id: 3,
      name: 'Performance Training Jacket',
      price: 89.99,
      originalPrice: 110.00,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
      category: 'Training',
      rating: 4.5,
      reviewCount: 87,
      badge: 'SALE',
      tags: ['all', 'training'],
    },
    {
      id: 4,
      name: 'Athletic Crew Socks (3-Pack)',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&q=80',
      category: 'Accessories',
      rating: 5,
      reviewCount: 302,
      tags: ['all', 'running', 'training', 'sports'],
    },
    {
      id: 5,
      name: 'Sport Water Bottle 750ml',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
      category: 'Accessories',
      rating: 4.5,
      reviewCount: 165,
      tags: ['all', 'training', 'sports'],
    },
    {
      id: 6,
      name: 'Basketball Pro Shorts',
      price: 54.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80',
      category: 'Team Sports',
      rating: 4,
      reviewCount: 78,
      badge: 'SALE',
      tags: ['all', 'sports'],
    },
    {
      id: 7,
      name: 'Gym Training Gloves',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
      category: 'Training',
      rating: 3.5,
      reviewCount: 54,
      tags: ['all', 'training'],
    },
    {
      id: 8,
      name: 'Trail Running Backpack',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
      category: 'Running',
      rating: 4.5,
      reviewCount: 134,
      badge: 'NEW',
      tags: ['all', 'running'],
    },
  ];

  get filteredProducts(): ProductCard[] {
    const tab = this.activeTab();
    return this.allProducts.filter((p) => p.tags.includes(tab));
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }
}
