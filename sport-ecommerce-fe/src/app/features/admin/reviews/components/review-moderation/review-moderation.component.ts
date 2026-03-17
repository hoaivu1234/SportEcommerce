import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-moderation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-moderation.component.html',
  styleUrl: './review-moderation.component.css'
})
export class ReviewModerationComponent {
  recentActions = [
    { name: 'Tyler Brooks', action: 'Review approved', time: '5 mins ago', icon: 'fa-check', color: '#22c55e' },
    { name: 'Eva Nguyen', action: 'Review flagged', time: '1 hour ago', icon: 'fa-flag', color: '#f59e0b' },
    { name: 'Omar Sherif', action: 'Review removed', time: '3 hours ago', icon: 'fa-trash', color: '#ef4444' },
  ];
}
