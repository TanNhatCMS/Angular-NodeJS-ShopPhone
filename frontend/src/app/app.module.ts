import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {StarComponent} from './components/star/star.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {HeaderComponent} from './components/header/header.component';
import {BannerComponent} from './components/banner/banner.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthService} from "./services/auth.service";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {GlobalErrorHandler} from "./utils/global-error-handler";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ErrorDialogComponent} from './components/error-dialog/error-dialog.component';
import {ErrorDialogService} from "./services/error-dialog.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoaderComponent} from './components/loader/loader.component';
import {LoaderInterceptor} from './services/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    NotFoundComponent,
    HomeComponent,
    ProductListComponent,
    StarComponent,
    ProductDetailsComponent,
    ProductComponent,
    CartComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    ErrorDialogService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: ErrorHandler, useClass: GlobalErrorHandler},

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
