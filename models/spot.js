const async = require('async');
const AWS = require('aws-sdk');
const fs = require('fs');
const randUUID = require('uuid/v4');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();

var get_params = {
  Key: {},
  TableName : 'spot'
};

var put_params = {
  Key: {},
  Item: {},
  TableName : 'spot',
};


var successful_response = {
  "message": "",
  "S_UUID": "",
  "P_UUID": ""
}

const post_byid = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id || !params.avail) {
      return reject("Requirement for the body not satisfied");
    }
    var S_UUID = params.id;
    var is_available = params.avail;
    put_params.Key["S_UUID"] = {"S": S_UUID};
    put_params.Item["is_available"] = {"S": is_available};

    dynamodb.updateItem(put_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
};



const get_byid = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id) {
      return reject("Requirement for the body not satisfied");
    }
    var S_UUID = params.id;
    get_params.Key["S_UUID"] = {"S": S_UUID};
    dynamodb.getItem(get_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied S_UUID");
      }
      return resolve(response);
    });
  });
};

const create_single_helper = (S_UUID, P_UUID) => {
  return new Promise((resolve, reject) => {
    if (!S_UUID || !P_UUID) {
      return reject("Error");
     }
    params.Item["S_UUID"] = {"S": S_UUID};
    params.Item["P_UUID"] = {"S": P_UUID};
    params.Item["is_available"] = {"S": "true"};
    
    dynamodb.putItem(params, function (err, response) {
      if (err) {
        return reject(err);
      };
    });
    successful_response.message = "Successfully created a spot";
    successful_response.S_UUID = S_UUID;
    successful_response.P_UUID = P_UUID;
    return resolve(successful_response);
  });
}

module.exports = {get_byid, post_byid, create_single_helper}
