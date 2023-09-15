import {Component, ViewChild} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {QuantityComponent} from "../../components/quantity/quantity.component";
import {CategoryService} from "../../services/category.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @ViewChild(QuantityComponent) quantityComponent: any;
  server = environment.serverURL;

  constructor(public cart: CartService, public category: CategoryService) {
  }


  changeQuantity(event: any, item: any) {
    this.cart.items.map((e: any) => {
      item.productID === e.productID ? item.quantity = event : 1;
      this.cart.updateCart();
    })
  }

}
