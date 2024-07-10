import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgFor, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { OutletsDetailsComponent } from './outlets-details/outlets-details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { IconsModule } from '../../../common/icons/icons.module';
import { ProductsService } from '../../../services/products.service';
import { Product, ProductImages } from '../../../models/products';
import { RatingComponent } from '../../../common/rating/rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    CarouselModule,
    NgFor,
    MatProgressBarModule,
    MatMenuModule,
    OutletsDetailsComponent,
    ReviewsComponent,
    IconsModule,
    RatingComponent,
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // Product Images
  productImages: ProductImages[] = [] as ProductImages[];
  selectedImage: string | undefined;
  product: Product = {} as Product;
  rating: number = 0;
  constructor(
    private productsService: ProductsService,
    private router: ActivatedRoute,
    private rt: Router
  ) { }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    if(id!==null){
      this.productsService.getProductById(id).subscribe((res: any) => {
        this.product = res as Product;
        console.log('Product', this.product);
        this.rating = this.product.ratings?.averageRating || 0;
        this.productImages = this.product.images;
      });
    } else {
      let slug = this.router.snapshot.paramMap.get('slug');
      if(slug!==null) {
        this.productsService.getProductBySlug(slug).subscribe((res: any) => {
          this.product = res as Product;
          console.log('Product', this.product);
          this.rating = this.product.ratings?.averageRating || 0;
          this.productImages = this.product.images;
        });
      }else{
        console.error('Product not found');
        this.rt.navigate(['/404']);
      }
    }
  }

  changeImage(image: string): void {
    this.selectedImage = image;
  }

  get averageRating(): number | undefined {
    return this.rating;
  }

  protected readonly Number = Number;
}
