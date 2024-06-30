import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  constructor(prod: ProductsService) {
    this.products = prod.getAllProducts();
  }
  filterProductList: Product[] = [];
  searching: string = '';

  ngOnInit(): void {
    this.filterProductList = this.products;
  }

  filterResults(): void {
    this.filterProductList = this.searching ?
      this.products.filter(product => product.productName.toLowerCase().includes(this.searching.toLowerCase())) :
      this.products;
  }
}
