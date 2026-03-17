import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  avgRating = 4.8;
  totalReviews = 248;

  reviews: Review[] = [
    {
      id: 1,
      author: 'Marcus T.',
      avatar: 'https://picsum.photos/seed/rev1/60/60',
      rating: 5,
      date: 'March 12, 2026',
      title: 'Best running shoes I\'ve ever owned',
      body: 'Absolutely incredible. The carbon plate gives an amazing energy return and the fit is perfect right out of the box. Would recommend to any serious runner.',
      verified: true,
    },
    {
      id: 2,
      author: 'Sarah K.',
      avatar: 'https://picsum.photos/seed/rev2/60/60',
      rating: 4,
      date: 'February 28, 2026',
      title: 'Great performance, slightly narrow',
      body: 'These shoes are super responsive and lightweight. My only complaint is they run a bit narrow, so if you have wider feet consider sizing up by half a size.',
      verified: true,
    },
    {
      id: 3,
      author: 'James O.',
      avatar: 'https://picsum.photos/seed/rev3/60/60',
      rating: 5,
      date: 'January 15, 2026',
      title: 'Elite-level footwear at every pace',
      body: 'I\'ve been training for marathons with these and the difference is noticeable. Cushioning is top-notch, and the stability on turns is excellent.',
      verified: false,
    },
  ];

  ratingBreakdown = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 6 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 2 },
  ];

  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const result: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) result.push('full');
      else if (rating >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  }
}
