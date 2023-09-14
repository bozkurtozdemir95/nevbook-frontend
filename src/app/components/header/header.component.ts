import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  @ViewChild('cartDropdown') public cartDropdown: any;
  menu: any = [
    {id: 0, title: "home", link: '/'},
    {id: 1, title: "shop", link: '/shop'},
  ];

  languages = [
    {id: 1, key: 'en', value: 'English'},
    {id: 2, key: 'mk', value: 'македонски'},
  ];

  constructor(public auth: AuthService,
              public langService: TranslateService,
              public cartService: CartService,
              public router: Router) {

  }

  ngOnInit() {
    this.getCartItems();
    console.log(this.langService.currentLang);
  }

  changeLang(key: string) {
    this.langService.use(key);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.getCartItems();
    this.router.navigate(['home']);
  }

  getCartItems(): void {
    this.cartService.getItems();
  }

  sendToCart(){
    this.cartDropdown.close();
    !this.auth.user && this.router.navigate(['profile']);
  }

}
