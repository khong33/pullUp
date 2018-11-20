const secret = require('../config/secret');
const AWS = require('aws-sdk');
const attr = require('dynamodb-data-types').AttributeValue;
AWS.config.update(secret.AWS_CREDENTIALS);
const dynamodb = new AWS.DynamoDB();
const date = new Date();


exports.getById = (UUID) => {
  return new Promise((resolve, reject) => {
    let getParams = {
      Key: {},
      TableName : 'user'
    };
    getParams.Key.UUID = {"S": UUID};
    dynamodb.getItem(getParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied UUID");
      }
      let userData = attr.unwrap(response.Item);
      return resolve(userData);
    });
  });
};

exports.postAccountInfo = (body) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject("Error: Requirement for the body not satisfied");
    }
    const postParams = {
      TableName: "user",
      Item: {}
    }
    const UUID = secret.hasher(body.email);
    const hashedPW = secret.hashPassword(body.password, UUID + body.licensePlate);
    postParams.Item.UUID = {"S": UUID};
    postParams.Item.password = {"S": hashedPW};
    postParams.Item.email = {"S": body.email};
    postParams.Item.first = {"S": body.first};
    postParams.Item.last = {"S": body.last};
    postParams.Item.birthday = {"S": body.birthday};
    postParams.Item.carModel = {"S": body.carModel};
    postParams.Item.licensePlate = {"S": body.licensePlate};
    postParams.Item.timestamp = {"S": date.toISOString()};
    // postParams.Item.paymentInfo = {"S": body.paymentInfo};
    dynamodb.putItem(postParams, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully created a user for: " + UUID);
    });
  });
};

exports.verifyByUUID = (UUID) => {
  return new Promise((resolve, reject) => {
    let getParams = {
      Key: {},
      TableName : 'user'
    };
    getParams.Key.UUID = {"S": UUID};
    dynamodb.getItem(getParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      isUnique = false;
      const verificationResult = {
        "UUID": UUID
      }
      if ('{}' === JSON.stringify(response) || !response.Item) {
        verificationResult.isUnique = true;
        return resolve(verificationResult);
      }
      verificationResult.isUnique = false;
      verificationResult.timestamp = response.Item.timestamp.S;
      return resolve(verificationResult);
    });
  });
};

exports.authenticate = (body) => {
  return new Promise((resolve, reject) => {
    let getParams = {
      Key: {},
      TableName : 'user'
    };
    getParams.Key.UUID = {"S": UUID};
    dynamodb.getItem(getParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied UUID");
      }
      let userData = attr.unwrap(response.Item);
      if (userData.password) {
        delete userData.password;
      }
      return resolve(userData);
    });
  });
};