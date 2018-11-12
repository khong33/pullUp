const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const dynamodb = new AWS.DynamoDB();
AWS.config.update(secret.AWS_CREDENTIALS);


exports.getById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.PUUID) {
      return reject("Requirement for the body not satisfied");
    }
    const getParams = {
      Key: {},
      TableName : 'parking'
    };
    getParams.Key.PUUID = params.PUUID;
    dynamodb.getItem(getParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied PUUID");
      }
      return resolve(response);
    });
  });
};

exports.postById = (body) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject("Requirement for the body not satisfied");
    }
    const spots = createSpots(Number(body.spotCount.S));
    const PUUID = randUUID();
    var postParams = {
      Item: {},
      TableName : 'parking',
    };
    postParams.Item = body;
    postParams.Item["PUUID"] = {"S": PUUID};
    postParams.Item["spots"] = {"SS": spots};
    dynamodb.putItem(postParams, function (err, response) {
      if (err) {
        reject(err);
      }
      resolve({
        "Message": "Successfully instantiated " + PUUID,
        "PUUID": PUUID,
        "spots": spots
      });
    });
  });
};

exports.deleteById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.PUUID) {
      return reject("Requirement for the body not satisfied");
    }
    var PUUID = params.PUUID;
    const deleteParams = {
      Key: {},
      TableName : 'parking'
    };
    deleteParams.Key.PUUID = {"S": PUUID};
    dynamodb.deleteItem(deleteParams, function (err, response) {
      if (err) {
        return reject("Error: Parking lot with PUUID: " + PUUID + " does not exist");
      }
      return resolve({
        "Message": "Successfully removed a parking lot",
        "PUUID": PUUID
      });
    });
  });
};

exports.getNearBy = (currZip) => {
  return new Promise((resolve, reject) => {
      if (!currZip) {
        return reject("Requirement for the body not satisfied");
      }
      const scanParams = {
        TableName: "parking",
        FilterExpression: "#address = :zip_",
        ExpressionAttributeNames: {
            "#address": "address",
        },
        ExpressionAttributeValues: {
            ":zip_": {"S": currZip}
        }
      };
      dynamodb.scan(scanParams, function (err, response) {
        if (err) {
          return reject("Error: Couldn't retrieve enough information with zip code: " + currZip);
        }
        return resolve(response);
      });
  });
};


const createSpots = (count) => {
  const spots = [];
  for (i = 0; i < count; i++) {
    spots.push(randUUID());
  }
  return spots;
}