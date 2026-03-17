import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: string = '';
  @Input() changePositive: boolean = true;
  @Input() icon: string = 'fa-chart-line';
  @Input() iconBgColor: string = '#3b82f6';
  @Input() subtitle: string = 'vs last month';
}
