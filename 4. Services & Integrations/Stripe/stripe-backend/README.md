# Stripe

## Backend (NodeJS)

1. Create project & install NPM dependencies
   ```console
   $ npm init
   $ tsc --init
   $ touch index.ts
   $ npm install stripe express cors --save
   ```
2. Modify `tsconfig.json` as follows

   ```json
   {
       //...
       "outDir": "dist/"
       //...
       "noImplicitAny": false
       //...
   }
   ```

3. Setup the main server over `index.ts` file

   ```ts
   const express = require('express');
   const Stripe = require('stripe');
   const stripe = new Stripe('STRIPE_SECRET_KEY'); // Setup the Stripe SECRET KEY
   const cors = require('cors');

   const app = express();

   app.use(cors({ origin: true, credentials: true }));
   app.use(express.json());

   // *************************************
   // HTTP Requests to Stripe goes in here!
   // *************************************

   app.listen(3000, () => {
     console.log('Stripe server on port', 3000);
   });
   ```

4. Configure the routes to handle Stripe payments

   - ### Simple Checkout (One-time-payment)

   ```ts
   app.post('/stripe/checkout', async (req, res) => {
     const { token, amount } = req.body;
     try {
       stripe.customers
         .create({
           name: 'Katana',
           email: 'takami.katana@gmail.com',
           source: token
         })
         .then(customer =>
           stripe.charges.create({
             amount: amount * 100,
             currency: 'MXN',
             customer: customer.id
           })
         )
         .then(() => {
           return res.status(200).json({ message: 'Successful Payment' });
         })
         .catch(err => {
           return res.json({ message: err.raw.message });
         });
     } catch (err) {
       return res.json({ message: err.raw.message });
     }
   });
   ```

5. Compile .ts and run server
   ```console
   $ tsc -w
   $ nodemon dist/index.js
   ```
