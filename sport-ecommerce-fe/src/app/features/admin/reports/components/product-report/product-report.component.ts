import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.css'
})
export class ProductReportComponent {
  products = [
    { name: 'Apex Runner Gen 3', category: 'Footwear', units: 1240, revenue: '$188,750', growth: '+11.6%', positive: true },
    { name: 'Compression Pro Tee', category: 'Apparel', units: 980, revenue: '$44,500', growth: '+8.2%', positive: true },
    { name: 'Elite Grip Basketball', category: 'Accessories', units: 860, revenue: '$58,340', growth: '+4.3%', positive: true },
    { name: 'Carbon Flow Goggles', category: 'Accessories', units: 710, revenue: '$22,500', growth: '+3.4%', positive: true },
    { name: 'Trail Blazer Shell', category: 'Apparel', units: 620, revenue: '$74,400', growth: '+9.1%', positive: true },
  ];
}
