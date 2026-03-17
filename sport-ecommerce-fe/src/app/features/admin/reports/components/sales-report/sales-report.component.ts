import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent {
  activeToggle: 'current' | 'previous' = 'current';

  // Mock data for SVG polyline (x: 0-420, y: 0-120 inverted)
  currentPoints = '0,100 60,80 120,60 180,75 240,40 300,55 360,30 420,20';
  previousPoints = '0,110 60,95 120,85 180,90 240,70 300,80 360,65 420,50';

  xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  yLabels = ['$5k', '$4k', '$3k', '$2k', '$1k', '$0'];

  setToggle(val: 'current' | 'previous') {
    this.activeToggle = val;
  }

  donut = [
    { label: 'Footwear', percent: 41, color: '#e8521a' },
    { label: 'Apparel', percent: 28, color: '#3b82f6' },
    { label: 'Accessories', percent: 18, color: '#22c55e' },
    { label: 'Equipment', percent: 13, color: '#a855f7' },
  ];

  getConicGradient(): string {
    let acc = 0;
    const stops = this.donut.map(d => {
      const start = acc;
      acc += d.percent;
      return `${d.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}
