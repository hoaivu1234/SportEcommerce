import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Order {
  id: string;
  customer: string;
  initials: string;
  date: string;
  status: string;
  statusClass: string;
  payment: string;
  total: string;
}

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {
  @Input() orders: Order[] = [];
}
