import {Component, ViewChild} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {QuantityComponent} from "../../components/quantity/quantity.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @ViewChild(QuantityComponent) quantityComponent: any;
  code: string = "";


  codeValid: any = false;

  constructor(public cart: CartService) {
    this.cart.activePromo ? this.codeValid = true : false;
  }

  applyCode() {
    this.cart.checkPromo();
  }

  changeQuantity(event: any, item: any) {
    this.cart.items.map((e: any) => {
      item.productID === e.productID ? item.quantity = event : 1;
      this.cart.updateCart();
    })
  }
}
