import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import {forkJoin, mergeMap, of, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];

  constructor(private productsService: ProductsService) {

      productsService.getAllProducts().subscribe( (res: any) => {
      console.log(res);
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
  //
  // getColor = (num: number) =>
  //   num < 50 ? 'text-danger' : num > 1500 ? 'text-success' : 'text-warning';
  filterProductList: Product[] = [];
  searching: string = '';



  filterResults(): void {
    this.filterProductList = this.searching ?
      this.products.filter(product => product.productName.toLowerCase().includes(this.searching.toLowerCase())) :
      this.products;
  }
}
