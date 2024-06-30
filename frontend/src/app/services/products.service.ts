import { Injectable } from '@angular/core';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  products: Product[] = [
    {
      id: 1,
      productName: "Leaf Rake",
      productCode: "GDN-0011",
      releaseDate: "March 19, 2016",
      description: "Leaf rake with 48-inch wooden handle.",
      price: 19.95,
      starRating: 3.2,
      imageUrl: "/assets/images/Leaf-Rake.png",
      code: "some-code-1",
      des: "some-description-1",
      inStock: 10
    },
    {
      id: 2,
      productName: "Garden Cart",
      productCode: "GDN-0023",
      releaseDate: "March 18, 2016",
      description: "15 gallon capacity rolling garden cart",
      price: 32.99,
      starRating: 4.2,
      imageUrl: "/assets/images/garden-cart.png",
      code: "some-code-2",
      des: "some-description-2",
      inStock: 20
    },
    {
      id: 5,
      productName: "Hammer",
      productCode: "TBX-0048",
      releaseDate: "May 21, 2016",
      description: "Curved claw steel hammer",
      price: 8.9,
      starRating: 4.8,
      imageUrl: "/assets/images/rejon-Hammer.png",
      code: "some-code-3",
      des: "some-description-3",
      inStock: 30
    },
    {
      id: 8,
      productName: "Saw",
      productCode: "TBX-0022",
      releaseDate: "May 15, 2016",
      description: "15-inch steel blade hand saw",
      price: 11.55,
      starRating: 3.7,
      imageUrl: "/assets/images/egore911-saw.png",
      code: "some-code-4",
      des: "some-description-4",
      inStock: 40
    },
    {
      id: 10,
      productName: "Video Game Controller",
      productCode: "GMG-0042",
      releaseDate: "October 15, 2015",
      description: "Standard two-button video game controller",
      price: 35.95,
      starRating: 4.6,
      imageUrl: "/assets/images/xbox-controller.png",
      code: "some-code-5",
      des: "some-description-5",
      inStock: 50
    }
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

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
}
