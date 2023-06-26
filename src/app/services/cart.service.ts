import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any = [];

  constructor() {
  }


  addToCart(product: any): void {
    const productExistInCart = this.items.find(({ productID }: any) => productID === product.productID);
    if (!productExistInCart) {
      this.items.push(product);
      localStorage.setItem('cart', JSON.stringify(this.items));
      console.log('Product added successfully');
      return;
    } else {
      console.log('Product has already been added');
    }
  }
  removeFromCart(value: any): void {
    const index: number = this.items.indexOf(value);
    this.items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.items));
    console.log('Product removed from your shopping cart');
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
