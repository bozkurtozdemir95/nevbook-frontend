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

  constructor( private toastr: Toastr, private http: HttpClient) {
  }


  addToCart(product: any): void {
    console.log(product);
    const productExistInCart = this.items.find(({ productID }: any) => productID === product.productID);
    if (!productExistInCart) {
      this.items.push(product);
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.toastr.success('Product added successfully');
      return;
    } else {
      this.toastr.error('Product has already been added');
    }
  }
  removeFromCart(value: any): void {
    const index: number = this.items.indexOf(value);
    this.items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.toastr.success('Product removed from your shopping cart');

  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem('cart');
  }

  getItems(): any[] {
    if ('cart' in localStorage) {
      // @ts-ignore
      this.items = JSON.parse(localStorage.getItem('cart'));
      return this.items;
    } else {
      return this.items;
    }
  }

  calculateTotal(){

  }
}
