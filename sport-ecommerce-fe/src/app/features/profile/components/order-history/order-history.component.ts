import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Order {
  id: string;
  date: string;
  itemCount: number;
  status: string;
  statusClass: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  orders: Order[] = [
    { id: 'RAG-99270', date: 'Aug 23, 2025', itemCount: 3, status: 'Delivered', statusClass: 'delivered', price: 189.50, image: 'https://picsum.photos/seed/510/64/64' },
    { id: 'RAG-98642', date: 'Aug 20, 2025', itemCount: 1, status: 'Shipped', statusClass: 'shipped', price: 89.10, image: 'https://picsum.photos/seed/511/64/64' },
    { id: 'RAG-87116', date: 'Aug 18, 2025', itemCount: 5, status: 'Processing', statusClass: 'processing', price: 210.00, image: 'https://picsum.photos/seed/512/64/64' },
    { id: 'RAG-96020', date: 'Aug 10, 2025', itemCount: 2, status: 'Delivered', statusClass: 'delivered', price: 140.00, image: 'https://picsum.photos/seed/513/64/64' },
    { id: 'RAG-96288', date: 'Jul 22, 2025', itemCount: 1, status: 'Cancelled', statusClass: 'cancelled', price: 40.00, image: 'https://picsum.photos/seed/514/64/64' },
  ];
}
