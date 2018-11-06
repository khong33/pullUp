var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');
// var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var crypto = require('crypto');
const randUUID = require('uuid/v4');
"use strict";

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

hashkey = "";


var update_params = {
  Key: {},
  UpdateExpression: "set is_available = :val",
  ExpressionAttributeValues: {
    ":val": {},
    "u_id": {}, 
    "email": {},
    "firstname": {}, 
    "lastname": {},
    "password": {}
  },
  TableName : 'registration',
};



exports.create_signup = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.emails || !params.fname || !params.lname || !params.passwords) {
      return reject("Requirement for the body not satisfied");
    }
    var U_UUID = randUUID();  ///generate a random UUID chance of a duplicate is very
    var email = params.emails;
    var firstname = params.fname;
    var lastname = params.lname;
    var password = params.passwords;
    update_params.Key["u_id"] = {"S": u_id};
    update_params.ExpressionAttributeValues[":email"] = {"S": (email)};
    update_params.ExpressionAttributeValues[":firstname"] = {"S": (firstname)};
    update_params.ExpressionAttributeValues[":lastname"] = {"S": (lastname)};
    update_params.ExpressionAttributeValues[":password"] = {"S": (passwords)};
    dynamodb.putItem(update_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully created user " + U_UUID + " to registration table" );
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

