import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.css',
})
export class NoResultsComponent {
  @Input() query = '';

  suggestions = [
    'Try different keywords',
    'Check spelling for typos',
    'Use more general terms',
    'Remove some filters',
  ];

  popularSearches = ['Running Shoes', 'Gym Shorts', 'Sports Jacket', 'Training Gloves', 'Yoga Mat'];
}
