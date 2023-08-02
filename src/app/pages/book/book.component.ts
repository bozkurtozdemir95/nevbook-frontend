import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import productData from '../../data/products.json';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  products = productData;
  book: any;
  quantity = 1;

  constructor(private route: ActivatedRoute, public cart: CartService) {
    this.route.params.subscribe(params => {

      this.products.find((e: any) => {
        if (e.productID === +params['id']) {
          this.book = e;
          console.log(this.book);
        }
      })
    });
  }

  changeQuantity(e: any) {
    this.book.quantity = e;
    console.log(this.book);
  }

}
