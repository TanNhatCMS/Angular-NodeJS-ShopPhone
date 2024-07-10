import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {Product} from "../../../../models/products";
import {NgIf} from "@angular/common";
import {RatingComponent} from "../../../../common/rating/rating.component";



@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    NgIf,
    RatingComponent


  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product: Product={} as Product;
}
