import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  name: string;
  image: string;
  count: number;
  featured?: boolean;
}

@Component({
  selector: 'app-category-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-showcase.component.html',
  styleUrl: './category-showcase.component.css',
})
export class CategoryShowcaseComponent {
  categories: Category[] = [
    {
      name: 'Running',
      image: 'https://images.unsplash.com/photo-1461897037042-96e29c3a0adf?w=700&q=80',
      count: 124,
      featured: true,
    },
    {
      name: 'Team Sports',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=80',
      count: 87,
      featured: true,
    },
    {
      name: 'Yoga Retreat',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80',
      count: 65,
      featured: true,
    },
    {
      name: 'Cycling',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=700&q=80',
      count: 98,
    },
    {
      name: 'Swimming',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&q=80',
      count: 53,
    },
    {
      name: 'Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80',
      count: 112,
    },
  ];
}
