import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartList: Cart[] = [];

  constructor() {}

  getCartAll(): Cart[] {
    return this.cartList;
  }

  addCart(productId: number, product: any) {
    let cartItem = this.cartList.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity! += 1;
    } else {
      this.cartList.push({
        id: productId,
        name: product.productName,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        code: product.productCode,
        des: product.description,
        inStock: product.inStock
      });
    }
  }

  getInStock(productId: number): number {
    let cartItem = this.cartList.find(item => item.id === productId);
    return cartItem ? cartItem.quantity! : 0;
  }

  totalItems(): number {
    return this.cartList.reduce((acc, item) => acc + item.quantity!, 0);
  }

  Total(): number {
    return this.cartList.reduce((acc, item) => acc + item.price! * item.quantity!, 0);
  }

  RemoveCart(index: number) {
    this.cartList.splice(index, 1);
  }

  DeleteAllCart() {
    this.cartList = [];
  }
}
