import { Component } from '@angular/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { CategoryShowcaseComponent } from './components/category-showcase/category-showcase.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { PromoSectionComponent } from './components/promo-section/promo-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    CategoryShowcaseComponent,
    FeaturedProductsComponent,
    PromoSectionComponent,
  ],
  template: `
    <app-hero-banner />
    <app-promo-section />
    <app-category-showcase />
    <app-featured-products />
  `,
})
export class HomeComponent {}
