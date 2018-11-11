const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const dynamodb = new AWS.DynamoDB();
AWS.config.loadFromPath('./credentials/aws_secrets.json');

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
    if (!params|| !params.id) {
      return reject("Requirement for the body not satisfied");
    }
    var PUUID = params.id;
    get_params.Key["PUUID"] = {"S": PUUID};
    dynamodb.deleteItem(get_params, function (err, response) {
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

exports.getByCoordinates = (params) => {
  const currLon = params.lon;
  const currLat = params.lat;
  const currZip = params.zip;

  return new Promise((resolve, reject) => {
    if (!params|| !params.lon || !params.lat || !params.zip) {
      return reject("Requirement for the body not satisfied");
    }
  });
};

const createSpots = (count) => {
  const spots = [];
  for (i = 0; i < count; i++) {
    spots.push(randUUID());
  }
  return spots;
}