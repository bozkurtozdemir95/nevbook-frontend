import {AfterViewInit, Component, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import productData from '../../data/products.json';
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements AfterViewInit {
  @ViewChildren('editable') components: any;

  products = productData;
  book: any;
  quantity = 1;

  editMode: boolean = false;

  constructor(private route: ActivatedRoute, public cart: CartService, public  auth: AuthService) {
    this.route.params.subscribe(params => {

      this.products.find((e: any) => {
        if (e.productID === +params['id']) {
          this.book = e;
        }
      })
    });
  }

  ngAfterViewInit() {
    this.components.toArray().forEach((e: any) => {
      e.nativeElement.readOnly = false;
    })
  }

  changeQuantity(e: any) {
    this.book.quantity = e;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }


}
