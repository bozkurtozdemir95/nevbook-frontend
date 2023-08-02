import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Toastr} from "./toastr.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any = [];
  api = environment.serverURL;
  total: number = 0;

  code: string = "";
  activePromo: any;

  constructor(private toastr: Toastr, private http: HttpClient) {
    this.getTotal();
  }


  addToCart(product: any): void {

    const productExistInCart = this.items.find(({productID}: any) => productID === product.productID);
    if (!productExistInCart) {
      !product.quantity ? product.quantity = 1 : product.quantity;
      this.items.push(product);
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.toastr.success('Product added successfully')
      this.http.post(this.api + '/api/calculate', this.items);
      return;
    } else {
      this.toastr.error('Product has already been added');
    }
    this.getTotal();
  }

  removeFromCart(value: any): void {
    const index: number = this.items.indexOf(value);
    this.items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.toastr.success('Product removed from your shopping cart');
    this.getTotal();
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem('cart');
    this.getTotal();
  }

  getItems(): any[] {
    if ('cart' in localStorage) {
      // @ts-ignore
      this.items = JSON.parse(localStorage.getItem('cart'));
      this.getTotal();
      return this.items;
    } else {
      this.getTotal();
      return this.items;
    }
  }

  checkPromo() {
    return this.http.post(this.api + '/api/promo', {code: this.code}).subscribe((e: any) => {
      this.activePromo = e;
      this.calculate();
    });
  }

  setPromo() {
    localStorage.setItem('active_promo', JSON.stringify(this.activePromo));
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.getTotal();
  }

  calculate() {
    return this.http.post(this.api + '/api/calculate', {
      code: this.activePromo,
      cart: this.items
    }).subscribe((e: any) => {
      this.items = e;
      this.updateCart();
      this.setPromo();
    });
  }

  getTotal() {
    this.total = 0;
    this.items.map((e: any) => {
      if (!e.newPrice) {
        this.total += e.quantity * e.price;
      } else {
        this.total += e.quantity * e.newPrice;
      }
    });
  }
}
