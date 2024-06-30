import { Component, Input } from '@angular/core';
import { Product } from '../../models/products';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productlist: Product[] = [];
  viewStar(valua: any) {
    alert(`${valua}`);
  }
  formProduct = new FormGroup({
    productId: new FormControl<number>(1),
    productName: new FormControl<string>(''),
    productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    imageUrl: new FormControl<string>('')
  });
  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  id: number = 0;
  constructor(private prod: ProductsService){
    this.productlist = prod.getAllProducts();
  }
  ngOnInit(): void {

  }
  onChange(event: any) {
    const str = event.target.files[0].name;
    this.file = '/assets/images/' + str;
  }
  Add(){
    this.formProduct.controls['productId'].setValue(this.prod.AutoId());
    this.prod.AddProduct(this.formProduct.value, this.file);
  }
  Edit(id: number){
    this.id = id;
    this.formProduct.controls.productName.setValue(this.prod.EditProduct(id).productName);
    this.formProduct.controls.productCode.setValue(this.prod.EditProduct(id).productCode);
    this.formProduct.controls.releaseDate.setValue(this.prod.EditProduct(id).releaseDate);
    this.formProduct.controls.price.setValue(this.prod.EditProduct(id).price);
    this.formProduct.controls.starRating.setValue(this.prod.EditProduct(id).starRating);
    this.formProduct.controls.description.setValue(this.prod.EditProduct(id).description);
    this.file = this.prod.EditProduct(id).imageUrl;
  }
  Update() {
      this.prod.UpdateProduct(this.id, this.formProduct.value, this.file);
  }
  Delete(index: any){
    this.prod.DeleteProduct(index);
  }
}
