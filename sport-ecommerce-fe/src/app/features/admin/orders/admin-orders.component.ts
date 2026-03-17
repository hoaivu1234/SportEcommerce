import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderTableComponent, Order } from './components/order-table/order-table.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderTableComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  searchQuery = '';
  activeTab = 'all';

  statsCards = [
    { label: 'Total Orders', value: '1,284', change: '+10.8%', changePositive: true },
    { label: 'Pending Fulfillment', value: '42', change: '+4.4%', changePositive: false },
    { label: 'Monthly Revenue', value: '$84,200', change: '+2.1%', changePositive: true },
    { label: 'Return Rate', value: '2.4%', change: '-0.8%', changePositive: true },
  ];

  tabs = [
    { key: 'all', label: 'All Orders', count: 1284 },
    { key: 'pending', label: 'Pending', count: 42 },
    { key: 'shipped', label: 'Shipped', count: 215 },
    { key: 'delivered', label: 'Delivered', count: 987 },
    { key: 'cancelled', label: 'Cancelled', count: 40 },
  ];

  allOrders: Order[] = [
    { id: '#AG-1283', customer: 'Marcus Aurelius', initials: 'MA', date: 'Feb 24 2023 10:32 AM', status: 'Pending', statusClass: 'pending', payment: 'Visa ****4242', total: '$249.58' },
    { id: '#AG-1282', customer: 'Serena Williams', initials: 'SW', date: 'Feb 24 2023 10:04 PM', status: 'Shipped', statusClass: 'shipped', payment: 'PayPal', total: '$120.00' },
    { id: '#AG-1281', customer: 'Tony Hawk', initials: 'TH', date: 'Feb 23 2023 01:32 PM', status: 'Delivered', statusClass: 'delivered', payment: 'Apple Pay', total: '$450.00' },
    { id: '#AG-1280', customer: 'Simone Biles', initials: 'SB', date: 'Feb 25 2023 4:22 PM', status: 'Shopping', statusClass: 'shopping', payment: 'Mastercard ****3312', total: '$89.95' },
    { id: '#AG-1279', customer: 'Cristiano R.', initials: 'CR', date: 'Feb 25 2023 11:33 AM', status: 'Cancelled', statusClass: 'cancelled', payment: 'Visa ****3133', total: '$310.00' },
  ];

  get filteredOrders(): Order[] {
    if (this.activeTab === 'all') return this.allOrders;
    return this.allOrders.filter(o => o.statusClass === this.activeTab);
  }

  setTab(tab: string) { this.activeTab = tab; }
}
