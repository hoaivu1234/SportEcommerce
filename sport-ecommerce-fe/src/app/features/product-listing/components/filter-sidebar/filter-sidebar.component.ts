import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  sportTypes = [
    { label: 'Running', checked: false },
    { label: 'Training', checked: false },
    { label: 'Basketball', checked: false },
    { label: 'Football', checked: false },
    { label: 'Tennis', checked: false },
  ];

  brands = [
    { label: 'ActiveGear', checked: false },
    { label: 'EliteFlex', checked: false },
    { label: 'SureTech', checked: false },
    { label: 'BuiltFit', checked: false },
    { label: 'Ironstrength', checked: false },
  ];

  sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
  selectedSizes: string[] = [];

  colors = [
    { name: 'Black', value: '#1a1a1a', selected: false },
    { name: 'White', value: '#ffffff', selected: false },
    { name: 'Red', value: '#e8521a', selected: false },
    { name: 'Blue', value: '#1a6ae8', selected: false },
    { name: 'Green', value: '#1ae852', selected: false },
    { name: 'Yellow', value: '#f5e642', selected: false },
  ];

  priceMin = 0;
  priceMax = 399;

  toggleSize(size: string) {
    const idx = this.selectedSizes.indexOf(size);
    if (idx > -1) {
      this.selectedSizes.splice(idx, 1);
    } else {
      this.selectedSizes.push(size);
    }
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSizes.includes(size);
  }

  toggleColor(color: any) {
    color.selected = !color.selected;
  }

  clearFilters() {
    this.sportTypes.forEach(s => s.checked = false);
    this.brands.forEach(b => b.checked = false);
    this.colors.forEach(c => c.selected = false);
    this.selectedSizes = [];
    this.priceMin = 0;
    this.priceMax = 399;
  }
}
