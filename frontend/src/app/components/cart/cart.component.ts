import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../models/cart';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productDetail: Product | undefined;
  cartList: Cart[] = [];
  InStock: number = 0;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {
    this.cartList = cartService.getCartAll();
  }

  ngOnInit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.productDetail = this.productService.getProductById(id);
    this.InStock = this.productDetail?.inStock || 0;
  }

  Add() {
    this.cartService.addCart(this.productDetail?.id!, this.productDetail);
    this.InStock = this.cartService.getInStock(this.productDetail?.id!)!;
  }

  ItemCount() {
    return this.cartService.totalItems();
  }

  ItemSum() {
    return this.cartService.Total();
  }

  Remove(index: number) {
    this.cartService.RemoveCart(index);
  }

  DeleteAll() {
    this.cartService.DeleteAllCart();
  }
}
