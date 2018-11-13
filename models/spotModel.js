const logger = require('../config/logger');
const secret = require('../config/secret');
const AWS = require('aws-sdk');
const attr = require('dynamodb-data-types').AttributeValue;
AWS.config.update(secret.AWS_CREDENTIALS);
const dynamodb = new AWS.DynamoDB();

exports.postById = (body) => {
  return new Promise((resolve, reject) => {
      if (!body || !body.SUUID || !body.PUUID) {
          return reject("Error: Requirement for the body not satisfied");
      }
      const postParams = {
          TableName: "spot",
          Item: {}
      }    
      const wrappedItems = attr.wrap(body);
      const randomFloor = String(Math.floor((Math.random() * 4) + 1));
      postParams.Item = wrappedItems;
      postParams.Item.avail = {"BOOL": false};
      postParams.Item.floor = {"N": randomFloor}
      dynamodb.putItem(postParams, function (err, response) {
          if (err) {
              reject(err);
          }
          resolve({
              "Message": "Successfully instantiated " + body.SUUID,
              "SUUID": body.SUUID,
              "PUUID": body.PUUID
          });
      });
  });
};

exports.putById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.SUUID || !params.avail) {
      return reject("Error: Requirement for the body not satisfied");
    }
    const putParams = {
      Key: {},
      UpdateExpression: "set avail = :val",
      ExpressionAttributeValues: {
        ":val": {}
      },
      TableName : 'spot',
    };
    const SUUID = params.SUUID;
    const avail = params.avail.toLowerCase();
    if (avail !== "true" && avail !== "false") {
      return reject("Error: Only 'true' or 'false' is used for the update.");
    }
    putParams.Key.SUUID = {"S": SUUID};
    putParams.ExpressionAttributeValues[":val"] = {"BOOL": Boolean(avail)};
    dynamodb.updateItem(putParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully Updated " + SUUID + " to " + avail);
    });
  });
};


exports.getById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.SUUID) {
      return reject("Error: Requirement for the body not satisfied");
    }
    const SUUID = params.SUUID;
    let getParams = {
      Key: {},
      TableName : 'spot'
    };
    getParams.Key.SUUID= {"S": SUUID};
    dynamodb.getItem(getParams, function (err, response) {
      if (err || !response.Item || response.Item.length == 0) {
        return reject("Error: No result found. Unidenfied SUUID");
      }
      return resolve(response);
    });
  });
};


exports.deleteById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.SUUID) {
      return reject("Error: Requirement for the body not satisfied");
    }
    let deleteParams = {
      Key: {},
      TableName : 'spot'
    };
    const SUUID = params.SUUID;
    deleteParams.Key.SUUID = {"S": SUUID};
    dynamodb.deleteItem(deleteParams, function (err, response) {
      if (err) {
        return reject("Error: Spot with SUUID: " + SUUID + " does not exist");
      }
      return resolve("Successfully removed a parking lot");
    });
  });
};

