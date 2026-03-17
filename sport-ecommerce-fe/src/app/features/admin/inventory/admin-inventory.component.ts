import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, InventoryTableComponent],
  templateUrl: './admin-inventory.component.html',
  styleUrl: './admin-inventory.component.css'
})
export class AdminInventoryComponent {
  statsCards = [
    { label: 'Total SKU Count', value: '1,284', icon: 'fa-boxes-stacked', iconBg: '#3b82f6' },
    { label: 'Critical Low Stock', value: '24', note: '⚠ Requires attention', icon: 'fa-triangle-exclamation', iconBg: '#ef4444' },
    { label: 'Total Inventory Value', value: '$284,592.00', icon: 'fa-dollar-sign', iconBg: '#22c55e' },
  ];
}
