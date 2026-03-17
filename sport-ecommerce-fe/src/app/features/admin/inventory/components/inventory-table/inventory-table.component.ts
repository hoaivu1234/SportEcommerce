import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.css'
})
export class InventoryTableComponent {
  items = [
    { name: "Zoom Pegasus AF 'Volt-Green'", sku: 'SKU-001', location: 'Warehouse A', stock: 13, stockMax: 200, supplier: 'Nike Distribution', status: 'Active', statusClass: 'active' },
    { name: 'Pro Tech Compression Shorts', sku: 'SKU-002', location: 'Warehouse B', stock: 595, stockMax: 600, supplier: 'Under Armour Global', status: 'Active', statusClass: 'active' },
    { name: 'Elite Training Yoga Mat', sku: 'SKU-003', location: 'Warehouse A', stock: 58, stockMax: 200, supplier: 'Under Armour', status: 'Low Stock', statusClass: 'low-stock' },
    { name: 'On-It ADV Race Singlet', sku: 'SKU-004', location: 'Warehouse A/B', stock: 18, stockMax: 200, supplier: 'Nike', status: 'Critical', statusClass: 'critical' },
    { name: 'Ultra Boost Light 23', sku: 'SKU-005', location: 'Warehouse A', stock: 9, stockMax: 200, supplier: 'Adidas North America', status: 'Critical', statusClass: 'critical' },
  ];

  getStockPercent(stock: number, max: number): number {
    return Math.min(100, (stock / max) * 100);
  }

  getBarClass(statusClass: string): string {
    if (statusClass === 'active') return 'bar-green';
    if (statusClass === 'low-stock') return 'bar-orange';
    return 'bar-red';
  }
}
