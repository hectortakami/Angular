import cors from 'cors';
import express from 'express';

const Stripe = require('stripe');
const stripe = new Stripe(
  'sk_test_51Hekl3D9e7mUzAHfpxE7dbyX6P99lbv4j480herza9waEcYHQshH5Sum4DuHhG11ZLBa4lErQcslb9eUN7dgP5mC00l6YfTptu'
);

const app = express();

// CORS
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// SIMPLE CHECKOUT
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

// OXXO CHECKOUT
app.post('/stripe/oxxo', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2050,
    currency: 'mxn',
    payment_method_types: ['oxxo']
  });

  return res.json({ client_secret: paymentIntent['client_secret'] });
});

// SUBSCRIPTION
app.post('/stripe/subscribe', async (req, res) => {
  const { token, plan_price } = req.body;
  try {
    stripe.customers
      .create({
        name: 'Katana Subscription',
        email: 'katana.subscription@gmail.com',
        source: token
      })
      .then(customer =>
        stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: plan_price }]
        })
      )
      .then(subscription => {
        return res
          .status(200)
          .json({ message: 'Successful subscription payment', subscription });
      })
      .catch(err => {
        return res.json({ message: err.raw.message });
      });
  } catch (err) {
    return res.json({ message: err.raw.message });
  }
});

app.post('/stripe/cancel-subscription', (req, res) => {});

app.get('/stripe/plans', async (req, res) => {
  stripe.plans
    .list()
    .then(async plans => {
      var subscriptions = {};
      for await (const plan of plans.data) {
        const product = await stripe.products.retrieve(plan.product);
        subscriptions[plan.id] = {
          name: product.name,
          images: product.images,
          product_id: product.id,
          price_id: plan.id,
          interval: plan.interval,
          active: plan.active,
          amount: plan.amount_decimal,
          currency: plan.currency,
          billing_scheme: plan.billing_scheme,
          trial_period_days: plan.trial_period_days,
          livemode: plan.livemode
        };
      }
      return res.json({ subscriptions: Object.values(subscriptions) });
    })
    .catch(err => {
      return res.json({ err });
    });
});

app.listen(3000, () => {
  console.log('Stripe server on port', 3000);
});
