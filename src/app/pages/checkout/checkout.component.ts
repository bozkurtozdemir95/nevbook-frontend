import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";
import {Toastr} from "../../services/toastr.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  paymentHandler: any = null;
  server = environment.serverURL;
  stripeAPIKey = environment.stripe.publicKey;

  // @ts-ignore
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private toastr: Toastr,
    private orderService: OrderService,
    public cart: CartService
  ) {
    this.checkoutForm = this.fb.group({
      address: [''],
      city: [''],
      province: [''],
      zip_code: [''],
      name_on_card: [''],
      total: [''],
      products: ['']
    });
  }

  ngOnInit() {
    this.invokeStripe();
  }

  sendOrder() {
    this.checkoutForm.value.total = this.cart.total;
    this.checkoutForm.value.products = this.cart.items;
    this.orderService.create(this.checkoutForm.value).subscribe(
      (result: any) => {
        this.toastr.success('Order created succesfully.');
        this.cart.clearCart();
      },
      (error: any) => {
        this.toastr.error('There was an error with your order.');
      },
    );
  }

  onSubmit() {

  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');

      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      currency: 'mkd',
      token: (stripeToken: any) => {
        this.sendOrder();
      },
    });
    paymentHandler.open({
      name: 'NEVBOOK',
      description: 'Secure Payment',
      amount: amount * 100,
    });
  }
}
