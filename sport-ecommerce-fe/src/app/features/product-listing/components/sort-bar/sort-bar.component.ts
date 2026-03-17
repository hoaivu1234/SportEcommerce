import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sort-bar.component.html',
  styleUrl: './sort-bar.component.css',
})
export class SortBarComponent {
  @Input() totalProducts = 0;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  @Output() sortChange = new EventEmitter<string>();

  selectedSort = 'best';

  sortOptions = [
    { value: 'best', label: 'Best Matches' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Top Rated' },
  ];

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  onSortChange() {
    this.sortChange.emit(this.selectedSort);
  }
}
