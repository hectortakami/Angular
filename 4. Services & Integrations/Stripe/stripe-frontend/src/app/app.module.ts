import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeSubscriptionComponent } from './components/stripe-subscription/stripe-subscription.component';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';
import { StripeOxxoCheckoutComponent } from './components/stripe-oxxo-checkout/stripe-oxxo-checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StripeCheckoutComponent,
    StripeOxxoCheckoutComponent,
    StripeSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(
      'pk_test_51Hekl3D9e7mUzAHfiCeuLWQWpxBIiNQvUszHyUfYjw4bbKBiJJuvjr6R7swj93naQ9aLyoYYxeTrxF1FxTl7Vooz006fZ8gTg6'
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
