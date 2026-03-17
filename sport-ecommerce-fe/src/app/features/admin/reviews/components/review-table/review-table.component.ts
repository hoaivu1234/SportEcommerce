import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Review {
  name: string;
  initials: string;
  rating: number;
  product: string;
  text: string;
  isPending: boolean;
}

@Component({
  selector: 'app-review-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-table.component.html',
  styleUrl: './review-table.component.css'
})
export class ReviewTableComponent {
  @Input() reviews: Review[] = [];

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
