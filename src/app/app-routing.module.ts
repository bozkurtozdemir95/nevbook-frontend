import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductsComponent} from "./pages/products/products.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {BookComponent} from "./pages/book/book.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shop', component: ProductsComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
