const logger = require('../config/logger');
const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const attr = require('dynamodb-data-types').AttributeValue;
const dynamodb = new AWS.DynamoDB();
const date = new Date();
// const stripe = require("stripe")(secret.STRIPE_KEY);

// exports.postById = (body, PUUID) => {
//     return new Promise((resolve, reject) => {
        
//         stripe.customers.create({
//             email: req.body.stripeEmail,
//            source: req.body.stripeToken
//          })
//          .then(customer =>
//            stripe.charges.create({
//              amount,
//              description: "Sample Charge",
//                 currency: "usd",
//                 customer: customer.id
//            }))
//          .then(charge => res.render("charge.pug"));


//     });
//   };
// }
  