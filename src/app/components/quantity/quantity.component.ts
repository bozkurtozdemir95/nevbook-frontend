import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent {

  @Output() quantity = 1;

  minus() {
    this.quantity > 1 ? this.quantity = this.quantity - 1 : this.quantity = 1;

  }

  plus() {
    this.quantity = this.quantity + 1;
  }
}
