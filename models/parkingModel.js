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

const createRandomSpots = (count) => {
  var spotIds = [];
  for (i = 0; i < count; i++) {
    spotIds.push(randUUID());
  }
  return spotIds;
}


const createSpots = (spotIds) => {
  var spots = [];
  for (i = 0; i < spotIds.length; i++) {
    var spot = {
      "SUUID": spotIds[i],
      "floor" : Math.floor((Math.random() * 5) + 1),
      "reservations": {}
    };
    spot = attr.wrap(spot);
    spots.push({"M": spot});
  }
  return spots;
}


exports.getByPUUID = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.puuid) {
      return reject("Requirement for the body not satisfied");
    }
    get_params.Key.PUUID = params.puuid
    dynamodb.getItem(get_params, function (err, response) {
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

exports.createSingle = (body) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject("Requirement for the body not satisfied");
    }
    const spotCount = Number(body.spotCount.S);
    const randomSpotIds = createRandomSpots(spotCount);
    const ListOfSUUID = {"L": createSpots(randomSpotIds)};
    const PUUID = randUUID();
    put_params.Item = body;
    put_params.Item["PUUID"] = {"S": PUUID};
    put_params.Item["spots"] = ListOfSUUID;
 
    dynamodb.putItem(put_params, function (err, response) {
      if (err) {
        reject(err);
      }
      resolve({
        "Message": "Successfully instantiated " + PUUID,
        "PUUID": PUUID,
        "Spots": randomSpotIds,
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



