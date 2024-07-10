import {Routes} from '@angular/router';
import {ProductDetailsComponent} from "./pages/shop/product-details/product-details.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {SignInComponent} from "./authentication/sign-in/sign-in.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {LogoutComponent} from "./authentication/logout/logout.component";
import {NotFoundComponent} from "./common/not-found/not-found.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {ProductsGridComponent} from "./pages/shop/products-grid/products-grid.component";
import {ProductsListComponent} from "./pages/shop/products-list/products-list.component";
import {UsersPageComponent} from "./pages/users-page/users-page.component";
import {UsersListComponent} from "./pages/users-page/users-list/users-list.component";
import {AddUserComponent} from "./pages/users-page/add-user/add-user.component";
import {CartComponent} from "./pages/shop/cart/cart.component";
import {CreateProductComponent} from "./pages/shop/create-product/create-product.component";


export const routes: Routes = [

  {
    path: '',
    component: ProductsGridComponent,
    title: 'Home',
    data: {animation: 'Right-Left'},
  },
  {
    path: 'users',
    component: UsersPageComponent,
    children: [
      {path: '', component: UsersListComponent},
      {path: 'add-user', component: AddUserComponent},
    ]
  },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {path: '', component: ProductsGridComponent},
      {path: 'products-list', component: ProductsListComponent},
      {path: 'details/:id', component: ProductDetailsComponent},
      {path: 'create-product', component: CreateProductComponent},
      {path: 'cart', component: CartComponent},
      // {path: 'checkout', component: ECheckoutComponent},
      // {path: 'orders-list', component: EOrdersListComponent},
      // {path: 'order-details', component: EOrderDetailsComponent},
      // {path: 'customers-list', component: ECustomersListComponent},
      // {path: 'sellers', component: ESellersComponent},
      // {path: 'seller-details', component: ESellerDetailsComponent},
    ]
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
      {path: '', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'logout', component: LogoutComponent}
    ]
  },
  {
    path: ':slug',
    component: ProductDetailsComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {animation: 'Left-Right'},
  }
];
