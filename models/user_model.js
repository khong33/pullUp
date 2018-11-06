var AWS = require('aws-sdk');
var crypto = require('crypto');
const randUUID = require('uuid/v4');
"use strict";

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();

hashkey = "";

var update_body = {
  Item: {},
  TableName : 'user',
};


exports.create_signup = (body) => {
  return new Promise((resolve, reject) => {
    if (!body|| !body.email || !body.first || !body.last || !body.pw) {
      return reject("Requirement for the body not satisfied");
    }
    // TODO: Make const UUID using the user ID
    // TODO: Hash pw
    const UUID = randUUID() + body.email
    update_body.Item.UUID = {"S": UUID};
    update_body.Item.email = {"S": (body.email)};
    update_body.Item.first = {"S": (body.first)};
    update_body.Item.last = {"S": (body.last)};
    update_body.Item.pw = {"S": (body.pw)};
    dynamodb.putItem(update_body, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully created user " + UUID + " to registration table" );
    });
  });
};


// //Add signup form data to database.
// var post_signup = function (reg_ids, emails, firstnames, lastnames, passwords, ) {
//         var formData = {
//           TableName: registration,
//           Item: {
//             reg_id: {'S': reg_ids}, 
//             email: {'S': emails},
//             firstname: {'S': firstnames}, 
//             lastname: {'S': lastnames},
//             password: {'S': passwords}
//           }
//         };
//         dynamodb.putItem(formData, function(err, data) {
//           if (err) {
//             console.log("users::save::error - " + JSON.stringify(err, null, 2));
//           } else {
//             console.log('Form data added to database.');
//           }
//         });
      
//       }

      //module.exports = {post_signup}

