import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [
  {path: '',component: HomeComponent, title: 'Home'},
  {path: 'list', component: ProductListComponent, title: 'Product List'},
  {path: 'cart/:id', component: CartComponent, title: 'Cart'},
  {path: 'product-details/:id', component: ProductDetailsComponent, title: 'Product Details'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'logout', component: HomeComponent, title: 'Home'},
  {path: 'register', component: RegisterComponent, title: 'Register'},
  {path: '**', component: HomeComponent, title: 'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
