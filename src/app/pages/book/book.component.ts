import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import productData from '../../data/products.json';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  products = productData;
  book : any;
  quantity = 1;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {

      this.products.find((e: any) => {
        if(e.productID === +params['id']){
          this.book = e;
        }
        console.log(this.book);
      })
    });
  }

  minus() {
    this.quantity > 1 ? this.quantity = this.quantity - 1 : this.quantity = 1;
  }

  plus() {
    this.quantity = this.quantity + 1;
  }
}
