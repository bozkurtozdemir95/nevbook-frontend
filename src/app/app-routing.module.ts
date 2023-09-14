import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductsComponent} from "./pages/products/products.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {BookComponent} from "./pages/book/book.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'shop', component: ProductsComponent},
  {path: 'shop/book/:id', component: BookComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
