import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.css'
})
export class RecentOrdersComponent {
  orders = [
    { id: '#AG-1283', customer: 'Alex Johnson', time: '2 mins ago', status: 'Pending', statusClass: 'pending', payment: 'Visa ****4242', total: '$249.58' },
    { id: '#AG-1282', customer: 'Sarah Williams', time: '23 mins ago', status: 'Shipped', statusClass: 'shipped', payment: 'PayPal', total: '$69.00' },
    { id: '#AG-1281', customer: 'Tony Hawk', time: '2 hrs ago', status: 'Delivered', statusClass: 'delivered', payment: 'Apple Pay', total: '$350.00' },
    { id: '#AG-1280', customer: 'Simone Bliss', time: '5 hrs ago', status: 'Shipping', statusClass: 'shipped', payment: 'Mastercard ****3312', total: '$89.95' },
    { id: '#AG-1479', customer: 'Cristiano R.', time: '12 hrs ago', status: 'Cancelled', statusClass: 'cancelled', payment: 'Visa ****3133', total: '$310.00' },
  ];
}
