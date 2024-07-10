import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface Star {
  star: string;
}

interface Ratings {
  star: Star[];
  totalRatings: number;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges{
  @Input() rating: number;
  @Input() totalRatings: number;
  ratings: Ratings;


  constructor() {
    this.rating = 0;
    this.totalRatings = 0;
    this.ratings = { star: [], totalRatings: 0 };
  }

  ngOnInit(): void {
    this.calculateStars();
  }

  ngOnChanges(): void {
    this.calculateStars();
  }

  calculateStars(): void {
    const fullStars = Math.floor(this.rating);
    const halfStar = (this.rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    this.ratings.star = [];

    for (let i = 0; i < fullStars; i++) {
      this.ratings.star.push({ star: 'ri-star-fill' });
    }

    if (halfStar) {
      this.ratings.star.push({ star: 'ri-star-half-fill' });
    }

    for (let i = 0; i < emptyStars; i++) {
      this.ratings.star.push({ star: 'ri-star-line' });
    }

    this.ratings.totalRatings = this.totalRatings;
  }

  trackByFn(index: number, item: Star): number {
    return index;
  }
}
