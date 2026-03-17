import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Output() close = new EventEmitter<void>();

  categoryName = '';
  parentCategory = '';
  description = '';
  showInNav = true;
  setActiveImmediately = true;

  onSubmit() {
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
