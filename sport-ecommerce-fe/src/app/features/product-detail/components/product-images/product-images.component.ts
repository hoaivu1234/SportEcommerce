import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css',
})
export class ProductImagesComponent {
  mainImage = 'https://picsum.photos/seed/100/600/600';

  thumbnails = [
    'https://picsum.photos/seed/101/200/200',
    'https://picsum.photos/seed/102/200/200',
    'https://picsum.photos/seed/103/200/200',
  ];

  selectedIndex = -1;

  selectThumbnail(index: number, url: string) {
    this.selectedIndex = index;
    this.mainImage = url.replace('200/200', '600/600');
  }
}
