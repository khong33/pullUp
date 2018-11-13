const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const dynamodb = new AWS.DynamoDB();
AWS.config.update(secret.AWS_CREDENTIALS);


exports.getById = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.PUUID) {
      return reject("Error: Requirement for the body not satisfied");
    }
    const getParams = {
      Key: {},
      TableName : 'parking'
    };
    getParams.Key.PUUID = params.PUUID;
    dynamodb.getItem(getParams, function (err, response) {
      if (err || !response || !response.Item || response.Item.length == 0) {
        return reject("Error: Failed to get specified PUUID's item from the DB");
      }
      return resolve(response);
    });
  });
};

exports.postById = (body) => {
  return new Promise((resolve, reject) => {
    if (!body || !body.name || !body.zip || !body.latitude || !body.longitude) {
      return reject("Error: Requirement for the body not satisfied. Name, zip, latitude, and longitude are required");
    }
    let spotCount = 5;
    if (body.spotCount) {
      spotCount = Number(body.spotCount.S);
    }
    if (spotCount < 1 || 100 < spotCount) {
      return reject("Error: Spot count exceeds maximum amount. Minimum is 1 and Maximum is 100");
    }
    const spots = createSpots(spotCount);
    const PUUID = randUUID();
    let postParams = {
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
      return reject("Error: Requirement for the body not satisfied");
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
      if (!currZip || !(0 <= Number(currZip)  && Number(currZip) <= 99999)) {
        return reject("Error: Requirement for the body not satisfied");
      }
      const scanParams = {
        TableName: "parking",
        FilterExpression: "#zip = :zip_",
        ExpressionAttributeNames: {
            "#zip": "zip",
        },
        ExpressionAttributeValues: {
            ":zip_": {"S": String(currZip)}
        }
      };
      dynamodb.scan(scanParams, function (err, response) {
        if (err || !response.Items) {
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