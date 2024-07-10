import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {RouterLink} from "@angular/router";
import {Product} from "../../../models/products";
import {ProductsService} from "../../../services/products.service";
import {ProductItemComponent} from "./product-item/product-item.component";
import {NgForOf} from "@angular/common";
import {BannerComponent} from "../../../common/banner/banner.component";

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    FormsModule,
    MatAnchor,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatMenu,
    MatMenuItem,
    MatOption,
    MatSelect,
    RouterLink,
    MatMenuTrigger,
    ProductItemComponent,
    NgForOf,
    BannerComponent
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss'
})
export class ProductsGridComponent implements  OnInit{
  products: Product[] = [];

  constructor(private productsService: ProductsService) {
    productsService.getAllProducts().subscribe( (res: any) => {
      this.products = res;
      this.filterProductList = this.products;
    });
  }
  ngOnInit(): void {
    this.productsService.currentProducts.subscribe((res: Array<any>) => {
      const [data] = res;
      if (data && data.length) {
        this.products = data;
      } else {
        this.products = [];
        this.getProducts();
      }
    });
    this.filterProductList = this.products;
  }
  getProducts(): void {
    this.productsService
      .getAllProducts()
      .subscribe((data: any) => {
        console.log( data);
        this.products = data;
        this.productsService.changeProducts([data]||[]);
      });
  }
  filterProductList: Product[] = [];
  searching: string = '';

  filterResults(): void {
    this.filterProductList = this.searching ?
      this.products.filter(
        product => product.name.toLowerCase().includes(this.searching.toLowerCase())) :
      this.products;
  }


}
