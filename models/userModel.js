const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const attr = require('dynamodb-data-types').AttributeValue;
const crypto = require('crypto');
AWS.config.update(secret.AWS_CREDENTIALS);
const dynamodb = new AWS.DynamoDB();
const date = new Date();


const hashPassword = (password) => {
  salt = crypto.randomBytes(16).toString('hex');
  hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return hash;
};

// const generateJWT = (email, ) => {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   return jwt.sign({
//     email: this.email,
//     id: this._id,
//     exp: parseInt(expirationDate.getTime() / 1000, 10),
//   }, 'secret');
// }


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
      if (userData.password) {
        delete userData.password;
        delete userData.email;
      }
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

    postParams.Item.UUID = {"S": body.email};
    postParams.Item.password = {"S": hashPassword(body.password)};
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
      return resolve("Successfully created a user for: " + body.email);
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