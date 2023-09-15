import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UiService} from "./services/ui.service";
import {AuthService} from "./services/auth/auth.service";
import {CartService} from "./services/cart.service";
import {CategoryService} from "./services/category.service";
import {environment} from "../environments/environment";
import {OrderService} from "./services/order.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Nevbook';

  scrolled = false;

  constructor(public translate: TranslateService,
              public ui: UiService,
              public auth: AuthService,
              private cart: CartService,
              private order: OrderService,
              public category: CategoryService) {
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    const user: any = localStorage.getItem('user');
    if (user) {
      this.auth.user = JSON.parse(user);
      this.auth.isAdmin = this.auth.user.type === "admin";
    }
    const activePromo: any = localStorage.getItem('active_promo');
    if (activePromo) {
      this.cart.activePromo = JSON.parse(activePromo);
    }
    console.log(this.auth.user);
  }

  ngOnDestroy() {
    localStorage.clear();
  }


  @HostListener("window:scroll", [])
  onScroll(): void {

    const scrolled: any = document.scrollingElement?.scrollTop;
    const vh50 = window.innerHeight / 2;

    this.scrolled = scrolled > vh50;
  }
}
