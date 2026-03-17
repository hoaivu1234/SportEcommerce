import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerTableComponent, CustomerDetailComponent],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent {
  searchQuery = '';

  statsCards = [
    { label: 'Total Customers', value: '12,642', note: '+138 last 30d', noteClass: 'positive' },
    { label: 'Active This Month', value: '8,210', note: '+622', noteClass: 'positive' },
    { label: 'Revenue (LTV)', value: '$1,420', note: '+5.2%', noteClass: 'positive' },
    { label: 'Churn Rate', value: '2.4%', note: '-0.3%', noteClass: 'positive' },
  ];
}
