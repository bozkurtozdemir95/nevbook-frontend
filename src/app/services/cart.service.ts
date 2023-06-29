import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Toastr} from "./toastr.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any = [];

  constructor( private toastr: Toastr) {
  }


  addToCart(product: any): void {
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
}
