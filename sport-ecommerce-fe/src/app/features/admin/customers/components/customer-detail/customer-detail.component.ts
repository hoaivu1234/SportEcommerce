import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customer = {
    name: 'Marcus Sterling',
    initials: 'MS',
    status: 'VIP',
    orders: 42,
    ltv: '$3,240',
    riskScore: 'High',
    email: 'marcus.sterling@gmail.com',
    phone: '+1 (555) 012-3456',
    lastSeen: '2 hours ago',
  };

  recentActivity = [
    { icon: 'fa-receipt', text: 'Placed order #AG-1283', time: '2 mins ago', color: '#3b82f6' },
    { icon: 'fa-star', text: 'Left a 5★ review on Apex Pro Shoes', time: '2 days ago', color: '#f59e0b' },
    { icon: 'fa-ticket', text: 'Support ticket #T-0342 resolved', time: '4 days ago', color: '#22c55e' },
  ];
}
