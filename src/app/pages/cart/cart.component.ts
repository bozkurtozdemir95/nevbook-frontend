import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  quantity = 1;

  minus() {
    this.quantity > 1 ? this.quantity = this.quantity - 1 : this.quantity = 1;
  }

  plus() {
    this.quantity = this.quantity + 1;
  }
}
