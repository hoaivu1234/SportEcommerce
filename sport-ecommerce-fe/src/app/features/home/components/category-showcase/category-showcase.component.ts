import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService, CategoryTreeNode } from '../../../admin/categories/services/category.service';

interface DepartmentColumn {
  id: number;
  name: string;
  subCategories: { id: number; name: string }[];
}

@Component({
  selector: 'app-category-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-showcase.component.html',
  styleUrl: './category-showcase.component.css',
})
export class CategoryShowcaseComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  departments = signal<DepartmentColumn[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.categoryService.getTreeCategories().subscribe({
      next: (res) => {
        this.departments.set(
          res.data
            .filter(root => (root.children ?? []).length > 0)
            .map(root => ({
              id: root.id,
              name: root.name,
              // Level-2 children are the sport-domain categories (Football Shoes, etc.)
              subCategories: (root.children ?? []).map(child => ({
                id: child.id,
                name: child.name,
              })),
            }))
        );
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  /** Maps Level-1 department name to a Font Awesome icon class. */
  getDeptIcon(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('shoe') || n.includes('boot') || n.includes('footwear')) return 'fa-shoe-prints';
    if (n.includes('cloth') || n.includes('apparel') || n.includes('wear')) return 'fa-shirt';
    if (n.includes('accessor')) return 'fa-tag';
    return 'fa-layer-group';
  }
}
