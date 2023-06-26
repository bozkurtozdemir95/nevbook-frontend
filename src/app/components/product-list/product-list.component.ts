import {Component, Input} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: any;
  data: any;
  private cartService: any;

  constructor(cartService: CartService) {
    this.cartService = cartService;

  }

  ngOnInit(): void {
    console.log(this.products)
  }


  removeItem(value: any): void {
    this.cartService.removeFromCart(value);
  }
}
