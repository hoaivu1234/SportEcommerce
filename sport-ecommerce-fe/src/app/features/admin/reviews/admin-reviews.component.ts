import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewTableComponent, Review } from './components/review-table/review-table.component';
import { ReviewModerationComponent } from './components/review-moderation/review-moderation.component';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, ReviewTableComponent, ReviewModerationComponent],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.css'
})
export class AdminReviewsComponent {
  activeTab = 'all';

  tabs = [
    { key: 'all', label: 'ALL REVIEWS' },
    { key: 'pending', label: 'PENDING APPROVAL' },
    { key: 'flagged', label: 'FLAGGED' },
  ];

  statsCards = [
    { label: 'Total Reviews', value: '1,284', icon: 'fa-comments', iconBg: '#3b82f6' },
    { label: 'Avg Rating', value: '4.8', stars: true, icon: 'fa-star', iconBg: '#f59e0b' },
    { label: 'Pending Approval', value: '24', icon: 'fa-clock', iconBg: '#d97706' },
  ];

  ratingBreakdown = [
    { stars: 5, count: 440, percent: 52 },
    { stars: 4, count: 113, percent: 27 },
    { stars: 3, count: 62, percent: 12 },
    { stars: 2, count: 41, percent: 5 },
    { stars: 1, count: 15, percent: 4 },
  ];

  allReviews: Review[] = [
    {
      name: 'Marcus Johnson', initials: 'MJ', rating: 5,
      product: 'Apex Pro Running Shoes – Midnight Edition',
      text: 'Maximum incredible performance on the track. These shoes give me the edge I need for my morning runs.',
      isPending: false
    },
    {
      name: 'Sarah Chen', initials: 'SC', rating: 4,
      product: 'Compression Tee Tight – Jet Black',
      text: 'Great compression and high quality fabric. The fit is snug but comfortable for long training sessions.',
      isPending: true
    },
    {
      name: 'David Miller', initials: 'DM', rating: 2,
      product: 'Vertex Hydration Bottle – 1L',
      text: 'The cap leaks when it\'s in my gym bag. Very disappointing for a product at this price point.',
      isPending: true
    },
    {
      name: 'Eva Rodriguez', initials: 'ER', rating: 5,
      product: 'Elite Yoga Mat – Crimson',
      text: 'Finally a mat that doesn\'t slip during hot yoga! The grip is outstanding and it\'s easy to clean.',
      isPending: false
    },
  ];

  get filteredReviews(): Review[] {
    if (this.activeTab === 'all') return this.allReviews;
    if (this.activeTab === 'pending') return this.allReviews.filter(r => r.isPending);
    return this.allReviews.filter(r => r.rating <= 2);
  }

  setTab(tab: string) { this.activeTab = tab; }
}
