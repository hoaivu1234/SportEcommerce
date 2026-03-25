import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortKey } from '../../models/product-filter.model';

interface SortOption {
  value: SortKey;
  label: string;
}

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
  /** Current sort key — driven by URL state from parent. */
  @Input() sort: SortKey = 'newest';

  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  @Output() sortChange     = new EventEmitter<SortKey>();

  readonly sortOptions: SortOption[] = [
    { value: 'newest',     label: 'Newest Arrivals'    },
    { value: 'price_asc',  label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ];

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewModeChange.emit(mode);
  }

  onSortChange(value: string): void {
    this.sortChange.emit(value as SortKey);
  }
}
