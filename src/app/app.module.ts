import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeMK from '@angular/common/locales/mk';

registerLocaleData(localeMK);

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {ProductsComponent} from './pages/products/products.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {CartComponent} from './pages/cart/cart.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ProductComponent} from './components/product/product.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {IconComponent} from './components/icon/icon.component';
import {CommonModule} from "@angular/common";
import {NgbCarousel, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BookComponent} from './pages/book/book.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./services/auth/auth-interceptor.service";
import {LoginComponent} from './pages/login/login.component';
import {QuantityComponent} from './components/quantity/quantity.component';
import {AuthGuardService} from "./services/auth/auth-guard.service";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { OrdersComponent } from './pages/profile/components/orders/orders.component';
import { UsersComponent } from './pages/profile/components/users/users.component';
import { ProductsTableComponent } from './pages/profile/components/products-table/products-table.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProfileComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    CheckoutComponent,
    IconComponent,
    BookComponent,
    ProductListComponent,
    LoginComponent,
    QuantityComponent,
    LoginFormComponent,
    RegisterFormComponent,
    OrdersComponent,
    UsersComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbCarousel,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'mk-MK'},
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
