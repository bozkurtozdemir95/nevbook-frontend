import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent {

  @Input() quantity: any;
  @Output('update') changeQuantity: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  minus() {
    this.quantity > 1 ? this.quantity -= 1 : this.quantity = 1;
    this.changeQuantity.emit(this.quantity);
  }

  plus() {
    this.quantity += 1;
    this.changeQuantity.emit(this.quantity);
  }

  getQuantity() {
    return this.changeQuantity.subscribe((e: any) => {
      return e;
    })
  }
}
