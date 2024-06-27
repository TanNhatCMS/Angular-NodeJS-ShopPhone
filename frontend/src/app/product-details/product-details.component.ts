import { Component } from '@angular/core';
import { Product } from '../products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetail:Product|undefined;
  constructor(private router: ActivatedRoute, private prod: ProductsService){

  }
  ngOnInit(): void {
    let id = Number(this.router.snapshot.paramMap.get('id'));
    this.productDetail = this.prod.getProductById(id);
  }
}
