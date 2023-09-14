import {Component, Input} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  server = environment.serverURL;
  // @ts-ignore
  @Input() product: any;
  private cartService: any;

  constructor(cartService: CartService) {
    this.cartService = cartService;

  }

  ngOnInit(): void {

  }


  addProduct(product: any): void {
    this.cartService.addToCart(product);
  }
}
