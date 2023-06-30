import {Component, HostListener} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UiService} from "./services/ui.service";
import {AuthService} from "./services/auth/auth.service";
import {CartService} from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nevbook';
  scrolled = false;

  constructor(translate: TranslateService, public ui: UiService, private auth: AuthService, private cart: CartService) {
    translate.setDefaultLang('en');
    translate.use('en');
    const user: any = localStorage.getItem('user');
    auth.user = JSON.parse(user);

  }


  @HostListener("window:scroll", [])
  onScroll(): void {

    const scrolled: any = document.scrollingElement?.scrollTop;
    const vh50 = window.innerHeight / 2;

    this.scrolled = scrolled > vh50;
  }
}
