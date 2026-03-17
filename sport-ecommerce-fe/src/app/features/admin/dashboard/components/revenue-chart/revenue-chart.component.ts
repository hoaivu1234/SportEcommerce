import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.css'
})
export class RevenueChartComponent {
  activeTab: 'daily' | 'monthly' = 'daily';

  dailyBars = [
    { label: 'Mon', value: 65, amount: '$3.2k' },
    { label: 'Tue', value: 80, amount: '$4.0k' },
    { label: 'Wed', value: 55, amount: '$2.7k' },
    { label: 'Thu', value: 90, amount: '$4.5k' },
    { label: 'Fri', value: 75, amount: '$3.7k' },
    { label: 'Sat', value: 95, amount: '$4.8k' },
    { label: 'Sun', value: 70, amount: '$3.5k' },
  ];

  monthlyBars = [
    { label: 'Jan', value: 60, amount: '$22k' },
    { label: 'Feb', value: 72, amount: '$26k' },
    { label: 'Mar', value: 85, amount: '$31k' },
    { label: 'Apr', value: 68, amount: '$25k' },
    { label: 'May', value: 90, amount: '$33k' },
    { label: 'Jun', value: 78, amount: '$28k' },
  ];

  get bars() {
    return this.activeTab === 'daily' ? this.dailyBars : this.monthlyBars;
  }

  setTab(tab: 'daily' | 'monthly') {
    this.activeTab = tab;
  }
}
