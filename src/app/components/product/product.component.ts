import {Component, Input} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  // @ts-ignore
  @Input() product: any;
  private cartService: any;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  ngOnInit(): void {
  }


  addProduct(product: any): void {
    product.count = 1;
    this.cartService.addToCart(product);
  }
}
