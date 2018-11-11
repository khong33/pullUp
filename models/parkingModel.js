const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const attr = require('dynamodb-data-types').AttributeValue;
//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();

var get_params = {
  Key: {},
  TableName : 'parking'
};

var put_params = {
    Item: {},
    TableName : 'parking',
  };

var successful_delete= {
  "message": "",
  "PUUID": ""
} 

var queryParams = {
  ExpressionAttributeValues: {
    ":c": {
      S: "Atlanta"
    }
  }, 
  KeyConditionExpression: "city = :c", 
  ProjectionExpression: "type", 
  TableName: "parking"
 };




const createSpots = (count) => {
  const spots = [];
  for (i = 0; i < count; i++) {
    spots.push(randUUID());
  }
  return spots;
}


exports.getByPUUID = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.puuid) {
      return reject("Requirement for the body not satisfied");
    }
    // get_params.Key.PUUID = params.puuid

    dynamodb.query(queryParams, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied PUUID");
      }
      console.log(response);
      return resolve(response);
    });
  });
};

exports.createSingle = (body) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject("Requirement for the body not satisfied");
    }
    const spots = createSpots(Number(body.spotCount.S));
    const PUUID = randUUID();
    put_params.Item = body;
    put_params.Item["PUUID"] = {"S": PUUID};
    put_params.Item["spots"] = {"SS": spots};
    dynamodb.putItem(put_params, function (err, response) {
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

exports.getNearBy = (params) => {
  const currLon = params.lon;
  const currLat = params.lat;
  const currZip = params.zip;

  return new Promise((resolve, reject) => {
    if (!params|| !params.lon || !params.lat || !params.zip) {
      return reject("Requirement for the body not satisfied");
    }

  });
};

exports.deleteByPUUID = (params) => {
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
      successful_delete.message = "Successfully removed a parking lot";
      successful_delete.PUUID = PUUID;
      return resolve(successful_delete);
    });
  });
};



