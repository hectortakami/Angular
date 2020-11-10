import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.scss']
})
export class StripeCheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  amount = 50.0;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#0000FF',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token
          this.createPaymentIntent(result.token.id, this.amount).subscribe(
            data => {
              console.log(data);
            }
          );
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  createPaymentIntent(id: string, amount: number) {
    return this.http.post('http://localhost:3000/stripe/checkout', {
      token: id,
      amount: amount
    });
  }
}
