import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    data: { animation: 'Right-Left' },
  },
  {
    path: 'list',
    component: ProductListComponent,
    title: 'Product List',
    data: { animation: 'Left-Right' },
  },
  {
    path: 'cart/:id',
    component: CartComponent,
    title: 'Cart',
    data: { animation: 'Left-Right' },
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
    data: { animation: 'Left-Right' },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    data: { animation: 'Left-Right' },
  },
  {
    path: 'logout',
    component: HomeComponent,
    title: 'Home',
    data: { animation: 'Left-Right' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    data: { animation: 'Left-Right' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'Left-Right' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
