import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl: string = '';
  private productSource = new BehaviorSubject([]);
  currentProducts = this.productSource.asObservable();
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  products: Product[] = [];
  getAllProducts = (): Observable<any> =>
    this.http.get<any>(`${this.apiUrl}/products`);

  // getAllProducts(): Product[] {
  //   return this.products;
  // }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  AddProduct(frmProduct: any, fileImg: string) {
    const newProduct: Product = {
      ...frmProduct,
      id: this.AutoId(),
      imageUrl: fileImg,
      starRating: frmProduct.starRating || 0
    };
    this.products.push(newProduct);
    console.log(this.products);
  }

  EditProduct(index: number) {
    return this.products[index];
  }

  UpdateProduct(index: number, frmProduct: any, fileImg: string) {
    this.products[index] = {
      ...this.products[index],
      productName: frmProduct.productName,
      productCode: frmProduct.productCode,
      releaseDate: frmProduct.releaseDate,
      price: frmProduct.price,
      description: frmProduct.description,
      imageUrl: fileImg,
      code: frmProduct.code || this.products[index].code,
      des: frmProduct.des || this.products[index].des,
      inStock: frmProduct.inStock || this.products[index].inStock,
      starRating: frmProduct.starRating || this.products[index].starRating
    };
  }

  DeleteProduct(index: number) {
    if (confirm('Do you want to delete')) {
      this.products.splice(index, 1);
    }
  }

  AutoId() {
    return this.products.length ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
  }
  changeProducts(data: any): void {
    this.productSource.next(data);
  }
}
