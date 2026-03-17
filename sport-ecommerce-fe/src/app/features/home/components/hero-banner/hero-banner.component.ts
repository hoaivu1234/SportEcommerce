import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css',
})
export class HeroBannerComponent {
  activeSlide = signal(0);

  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
      eyebrow: 'New Season Collection',
      title: 'VELOCITY\nWITHOUT\nLIMITS',
      subtitle: 'Push past boundaries with our new performance running gear. Engineered for champions.',
      cta: 'Shop Now',
    },
    {
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600&q=80',
      eyebrow: 'Team Sports',
      title: 'DOMINATE\nTHE\nCOURT',
      subtitle: 'Professional-grade equipment for every sport. Gear up and get in the game.',
      cta: 'Explore Collection',
    },
    {
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',
      eyebrow: 'Wellness & Yoga',
      title: 'FIND YOUR\nINNER\nSTRENGTH',
      subtitle: 'Premium yoga and wellness products for body and mind balance.',
      cta: 'Discover More',
    },
  ];

  goToSlide(index: number) {
    this.activeSlide.set(index);
  }

  nextSlide() {
    this.activeSlide.update((i) => (i + 1) % this.slides.length);
  }

  prevSlide() {
    this.activeSlide.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  get titleLines(): string[] {
    return this.slides[this.activeSlide()].title.split('\n');
  }
}
