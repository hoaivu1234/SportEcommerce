import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promo-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promo-section.component.html',
  styleUrl: './promo-section.component.css',
})
export class PromoSectionComponent {
  email = '';
  subscribed = false;

  subscribe() {
    if (this.email) {
      this.subscribed = true;
    }
  }

  promoCards = [
    {
      icon: 'fas fa-shipping-fast',
      title: 'Free Shipping',
      desc: 'On all orders over $75',
      color: '#e8521a',
    },
    {
      icon: 'fas fa-undo-alt',
      title: 'Easy Returns',
      desc: '30-day return policy',
      color: '#2563eb',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure Payment',
      desc: '100% protected checkout',
      color: '#16a34a',
    },
  ];
}
