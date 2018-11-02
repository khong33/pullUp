const stripe = require('stripe')(sk_test_);

module.exports = (req) => {
  const token = req.body.stripeToken;

  return stripe.charges.create({
    amount: parseInt(999, 10),
    currency: usd,
    source: token,
    description: 'My shoes', // 👈 remember to change this!
    // this metadata object property can hold any
    // extra private meta data (like IP address)
    metadata: {},
  });
}