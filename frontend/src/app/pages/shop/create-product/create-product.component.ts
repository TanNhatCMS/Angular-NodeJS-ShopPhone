import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterLink} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxEditorModule, Editor, Toolbar} from 'ngx-editor';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {MatSelectModule} from '@angular/material/select';
import {IconsModule} from "../../../common/icons/icons.module";
import {MatCheckbox} from "@angular/material/checkbox";
import slugify from "slugify";
import {AuthService} from "../../../services/auth.service";
import {NewProduct, ProductImages, ProductRatings} from "../../../models/products";
import {SignInForm} from "../../../models/auth";
import {ProductsService} from "../../../services/products.service";


@Component({
  selector: 'app-create-produc',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxEditorModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    IconsModule,
    MatCheckbox,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit, OnDestroy {
    productForm: FormGroup;
  // Text Editor
  editor: Editor;
  html = '';
  product: NewProduct = {} as NewProduct;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductsService,
    private router: Router
  ) {
    this.editor = new Editor();
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      screen: ['', [Validators.required]],
      backCamera: ['', [Validators.required]],
      frontCamera: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      price: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      productStatus: [false, [Validators.required]],
      ram: ['', [Validators.required]],
      storage: ['', [Validators.required]],
      promotionalPrice: [0, [Validators.required]],
      promotionStatus: [false, [Validators.required]],
      stockQuantity: [0, [Validators.required]],
      images: ['', [Validators.required]],
      averageRating: [0, [Validators.required]],
      totalRating: [0, [Validators.required]],
    });
    this.productForm.get('slug')?.disable();
  }

  generateSlug(): void {
    if (this.productForm) {
      const titleValue = this.productForm.get('title')?.value || '';
      const slugValue = slugify(titleValue, {
        lower: true,      // Convert to lowercase
        strict: true,     // Remove invalid characters
        locale: 'vi'      // Apply Vietnamese locale rules
      });
      this.productForm.get('slug')?.setValue(slugValue);
  }
  }


  ngOnInit(): void {

  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  stringifyProductImages(images: ProductImages[]): string {
    return images.map(image => image.url).join('\n');
  }


  parseProductImages(input: string): ProductImages[] {
  return input
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0)
    .map(url => ({ url }));
}
  onSubmit() {
    if (this.productForm && this.productForm.valid) {
      console.log(this.productForm.value);
      let ratings: ProductRatings = {
        averageRating: this.productForm.value.averageRating,
        totalRatings: this.productForm.value.totalRating
      };

      this.product = {
        name: this.productForm.value.title,
        slug: this.productForm.value.slug,
        screen: this.productForm.value.screen,
        backCamera: this.productForm.value.backCamera,
        frontCamera: this.productForm.value.frontCamera,
        thumbnail: this.productForm.value.thumbnail,
        price: this.productForm.value.price,
        brand: this.productForm.value.brand,
        category: this.productForm.value.category,
        description: this.productForm.value.description,
        productStatus: this.productForm.value.productStatus,
        ram: this.productForm.value.ram,
        storage: this.productForm.value.storage,
        promotionalPrice: this.productForm.value.promotionalPrice,
        promotionStatus: this.productForm.value.promotionStatus,
        stockQuantity: this.productForm.value.stockQuantity,
        images: this.parseProductImages(this.productForm.value.images), // Assuming parseProductImages works correctly
        ratings: ratings
      };
       this.productService.AddProduct(this.product);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
