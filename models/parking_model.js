const async = require('async');
const AWS = require('aws-sdk');
const fs = require('fs');
const randUUID = require('uuid/v4');
//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var get_params = {
  Key: {},
  TableName : 'parking'
};


var put_params = {
    Item: {},
    TableName : 'parking',
  };

var successful_create = {
  "message": "",
  "P_UUID": "",
  "S_UUID": []
} 

var successful_delete= {
  "message": "",
  "P_UUID": ""
} 


const create_spots = (count) => {
  var spots = [];
  for (i = 0; i < count; i++) {
    spots.push(randUUID());
  }
  return spots;
}


exports.get_by_id = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id) {
      return reject("Requirement for the body not satisfied");
    }
    var P_UUID = params.id;
    get_params.Key["P_UUID"] = {"S": P_UUID};
    dynamodb.getItem(get_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied P_UUID");
      }
      return resolve(response);
    });
  });
};

exports.create_single = (body) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject("Requirement for the body not satisfied");
    }
    put_params.Item = body;
    const P_UUID = randUUID();
    const S_UUID = create_spots(5);
    put_params.Item["P_UUID"] = {"S": P_UUID};
    put_params.Item["S_UUID"] = {"SS": S_UUID};
    dynamodb.putItem(put_params, function (err, response) {
      if (err) {
        reject(err);
      }
      successful_create.message = "Successfully created a parking lot";
      successful_create.P_UUID = P_UUID;
      successful_create.S_UUID = S_UUID;
      resolve(successful_create);
    });
  });
};

exports.get_by_coord = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.long || !params.lat) {
      return reject("Requirement for the body not satisfied");
    }
    const long = params.long;
    const lat = params.lat;
    // TODO: COORDINATE BASED SEARCH
    // get zip code
    // find near by parking lot objects

  });
};

exports.delete_by_id = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id) {
      return reject("Requirement for the body not satisfied");
    }
    P_UUID = params.id;
    get_params.Key["P_UUID"] = {"S": P_UUID};
    dynamodb.deleteItem(get_params, function (err, response) {
      if (err) {
        return reject("Error: Parking lot with P_UUID: " + P_UUID + " does not exist");
      }
      successful_delete.message = "Successfully removed a parking lot";
      successful_delete.P_UUID = P_UUID;
      return resolve(successful_delete);
    });
  });
};

