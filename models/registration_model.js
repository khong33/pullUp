var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();



//Add signup form data to database.
var signup = function (reg_ids, emails, firstnames, lastnames, passwords, ) {
        var formData = {
          TableName: registration,
          Item: {
            reg_id: {'S': reg_ids}, 
            email: {'S': emails},
            firstname: {'S': firstnames}, 
            lastname: {'S': lastnames},
            password: {'S': passwords}
          }
        };
        dynamodb.putItem(formData, function(err, data) {
          if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
          } else {
            console.log('Form data added to database.');
          }
        });
      
      }

      module.exports = {signup}

