import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, RevenueChartComponent, RecentOrdersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  statsCards = [
    {
      title: 'Total Revenue',
      value: '$128,430.00',
      change: '+11.2%',
      changePositive: true,
      icon: 'fa-dollar-sign',
      iconBgColor: '#3b82f6',
      subtitle: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: '1,420',
      change: '+4.2%',
      changePositive: true,
      icon: 'fa-shopping-cart',
      iconBgColor: '#e8521a',
      subtitle: 'vs last month'
    },
    {
      title: 'New Customers',
      value: '342',
      change: '-3.1%',
      changePositive: false,
      icon: 'fa-users',
      iconBgColor: '#22c55e',
      subtitle: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '3.84%',
      change: '+4.6%',
      changePositive: true,
      icon: 'fa-chart-line',
      iconBgColor: '#a855f7',
      subtitle: 'vs last month'
    },
  ];

  inventoryAlerts = [
    { name: 'Pro Grip Basketball', units: 3 },
    { name: 'Apex Running Shoes (Red 10)', units: 12 },
    { name: 'Titan Yoga Mat', units: 5 },
  ];

  quickActions = [
    { title: 'Manage Inventory', icon: 'fa-warehouse', desc: 'Track stock levels and reorder', color: '#3b82f6' },
    { title: 'Review Analytics', icon: 'fa-chart-line', desc: 'Deep dive into your store data', color: '#a855f7' },
    { title: 'System Settings', icon: 'fa-gear', desc: 'Configure store preferences', color: '#64748b' },
  ];
}
