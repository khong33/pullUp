const logger = require('../config/logger');
const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');

AWS.config.update(secret.AWS_CREDENTIALS);
const dynamodb = new AWS.DynamoDB();

hashkey = "";

var update_body = {
  Item: {},
  TableName : 'user',
};

var get_params = {
  Key: {},
  TableName : 'user'
};

exports.getById = (UUID) => {
  return new Promise((resolve, reject) => {
    get_params.Key.UUID = {"S": UUID};
    dynamodb.getItem(get_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied UUID");
      }
      return resolve(response);
    });
  });
};

exports.postById = (body) => {
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


exports.putById = (body) => {
};
