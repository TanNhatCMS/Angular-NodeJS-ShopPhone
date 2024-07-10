import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {AuthService} from "./auth.service";
import {DialogService} from "./dialog.service";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private baseURL: string = environment.apiUrl;

  private productSource = new BehaviorSubject([]);

  currentProducts = this.productSource.asObservable();

  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private authService: AuthService
              ) {
  }

  getAllProducts = (): Observable<Product[]> =>
    this.http.get<Product[]>(`${this.baseURL}/products`);

  getProductById = (id: string) =>  this.http.get<Product>(`${this.baseURL}/product/${id}`);

  getProductBySlug = (slug: string) =>  this.http.get<Product>(`${this.baseURL}/product/slug/${slug}`);

  AddProduct(frmProduct: any): Product {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let data: Product = {} as Product;
   this.http.post<Product[]>(`${this.baseURL}/product`, frmProduct, { headers }).subscribe({
      next: (response: any) => {
        this.dialogService.openDialog({
          title: 'Thêm sản phẩm',
          message: 'Thêm sản phẩm thành công'
        });
        return response.data;
      },
      error: (err) => {
        console.log(err);
        this.dialogService.openDialog({
          title: 'Thêm sản phẩm thất bại',
          message: 'Thêm sản phẩm thất bại: ' + (err.error.message ? err.error.message : err.message)
        });
      }
    });
   return data;
  }

  UpdateProduct(id: string, frmProduct: any): Observable<Product[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Product[]>(`${this.baseURL}/product/${id}`, frmProduct, { headers });
  }

  DeleteProduct(id: string): Observable<Product[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Product[]>(`${this.baseURL}/product/${id}`, { headers });
  }

  changeProducts(data: any): void {
    this.productSource.next(data);
  }
}
