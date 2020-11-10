import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-stripe-oxxo-checkout',
  templateUrl: './stripe-oxxo-checkout.component.html',
  styleUrls: ['./stripe-oxxo-checkout.component.scss']
})
export class StripeOxxoCheckoutComponent implements OnInit {
  stripe;
  amount = 20.5;
  constructor(private http: HttpClient) {
    this.initStripeInstance();
  }

  ngOnInit(): void {}

  async initStripeInstance() {
    this.stripe = await loadStripe(
      'pk_test_51Hekl3D9e7mUzAHfiCeuLWQWpxBIiNQvUszHyUfYjw4bbKBiJJuvjr6R7swj93naQ9aLyoYYxeTrxF1FxTl7Vooz006fZ8gTg6'
    );
  }

  createOxxoSecret() {
    this.http.post('http://localhost:3000/stripe/oxxo/', {}).subscribe(data => {
      this.payOxxo(data['client_secret']);
    });
  }

  async payOxxo(secret: string) {
    const result = await this.stripe.confirmOxxoPayment(secret, {
      payment_method: {
        billing_details: {
          name: 'Katana Systems',
          email: 'takami.katana@gmail.com'
        }
      }
    });
    // Stripe.js will open a modal to display the OXXO voucher to your customer
    // This async function finishes when the customer closes the modal

    if (result.error) {
      // Display error to your customer
      const errorMsg = document.getElementById('error-message');
      errorMsg.innerText = result.error.message;
    }
  }
}
