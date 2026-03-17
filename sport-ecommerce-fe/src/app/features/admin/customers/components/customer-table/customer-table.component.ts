import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent {
  customers = [
    { name: 'Marcus Sterling', initials: 'MS', status: 'VIP', statusClass: 'vip', orders: 42, ltv: '$3,240.00', joined: 'Jan 10 2023' },
    { name: 'Diana Rodriguez', initials: 'DR', status: 'New', statusClass: 'new', orders: 5, ltv: '$245.00', joined: 'Mar 14 2023' },
    { name: 'Julian Chen', initials: 'JC', status: 'Regular', statusClass: 'regular', orders: 15, ltv: '$780.00', joined: 'May 19 2023' },
    { name: 'David Okafor', initials: 'DO', status: 'Inactive', statusClass: 'inactive', orders: 3, ltv: '$675.00', joined: 'Aug 21 2023' },
  ];
}
