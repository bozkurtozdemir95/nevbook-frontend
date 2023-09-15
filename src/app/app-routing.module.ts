import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductsComponent} from "./pages/products/products.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {BookComponent} from "./pages/book/book.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {LoginComponent} from "./pages/login/login.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'shop', component: ProductsComponent},
  {path: 'shop/book/:id', component: BookComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
