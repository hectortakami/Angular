import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-subscription',
  templateUrl: './stripe-subscription.component.html',
  styleUrls: ['./stripe-subscription.component.scss']
})
export class StripeSubscriptionComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  plans = [];
  selected = null;
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
    this.getPlans();
  }

  getPlans() {
    this.http.get('http://localhost:3000/stripe/plans').subscribe(data => {
      console.log(data['subscriptions']);
      this.plans = data['subscriptions'];
    });
  }

  onSelectionChange(value) {
    console.log(value);
  }

  createToken(): void {
    if (this.selected != null) {
      const name = this.stripeTest.get('name').value;
      this.stripeService
        .createToken(this.card.element, { name })
        .subscribe(result => {
          if (result.token) {
            this.createPaymentIntent(
              result.token.id,
              this.selected.price_id
            ).subscribe(data => {
              console.log(data);
            });
          } else if (result.error) {
            console.log(result.error.message);
          }
        });
    }
  }

  createPaymentIntent(id: string, plan_price: string) {
    return this.http.post('http://localhost:3000/stripe/subscribe', {
      token: id,
      plan_price
    });
  }
}
