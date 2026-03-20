import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  categoryServices = inject(CategoryService);

  categories: any[] = [];

  ngOnInit(): void {
    this.categoryServices.getFlatCategories().subscribe({
      next: (response) => {
        this.categories = response.data.content;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
