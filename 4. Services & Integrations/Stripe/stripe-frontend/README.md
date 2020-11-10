npm install ngx-stripe @stripe/stripe-js --save

`app.module.ts`

```ts
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// ...
imports: [
    //...
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('STRIPE_PUBLIC_KEY'),
  ],
```
