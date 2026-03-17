import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { ProductReportComponent } from './components/product-report/product-report.component';
import { ExportPanelComponent } from './components/export-panel/export-panel.component';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, SalesReportComponent, ProductReportComponent, ExportPanelComponent],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {
  statsCards = [
    { label: 'Total Revenue', value: '$458,230', change: '+5.3%', positive: true, icon: 'fa-dollar-sign', iconBg: '#3b82f6' },
    { label: 'Avg Order Value', value: '$142.50', change: '+2.6%', positive: true, icon: 'fa-receipt', iconBg: '#22c55e' },
    { label: 'Total Orders', value: '3,214', change: '+2.19%', positive: true, icon: 'fa-shopping-cart', iconBg: '#e8521a' },
    { label: 'Active Customers', value: '4.82%', change: '+4.4%', positive: true, icon: 'fa-users', iconBg: '#a855f7' },
  ];
}
