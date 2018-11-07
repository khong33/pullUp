const async = require('async');
const AWS = require('aws-sdk');
const fs = require('fs');
const randUUID = require('uuid/v4');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();

var delete_params = {
  Key: {},
  TableName : 'spot'
};

var successful_delete= {
  "message": "",
  "S_UUID": ""
} 


var get_params = {
  Key: {},
  TableName : 'spot'
};

var put_params = {
  Item: {},
  TableName : 'spot',
};


var update_params = {
  Key: {},
  UpdateExpression: "set is_available = :val",
  ExpressionAttributeValues: {
    ":val": {}
  },
  TableName : 'spot',
};


var successful_response = {
  "message": "",
  "S_UUID": "",
  "P_UUID": ""
}

exports.post_byid = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id || !params.avail) {
      return reject("Requirement for the body not satisfied");
    }
    var S_UUID = params.id;
    var is_available = params.avail;
    update_params.Key["S_UUID"] = {"S": S_UUID};
    update_params.ExpressionAttributeValues[":val"] = {"BOOL": Boolean(is_available)};
    dynamodb.updateItem(update_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully Updated " + S_UUID + " to " + is_available);
    });
  });
};



exports.get_byid = (params) => {
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

exports.create_single_helper = (S_UUID, P_UUID) => {
  return new Promise((resolve, reject) => {
    if (!S_UUID || !P_UUID) {
      return reject("Error");
     }
     put_params.Item["S_UUID"] = {"S": S_UUID};
     put_params.Item["P_UUID"] = {"S": P_UUID};
     put_params.Item["is_available"] = {"BOOL": true};
    
    dynamodb.putItem(put_params, function (err, response) {
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

exports.delete_by_id = (params) => {
  return new Promise((resolve, reject) => {
    if (!params|| !params.id) {
      return reject("Requirement for the body not satisfied");
    }
    var S_UUID = params.id;
    delete_params.Key["S_UUID"] = {"S": S_UUID};
    dynamodb.deleteItem(delete_params, function (err, response) {
      if (err) {
        return reject("Error: Spot with S_UUID: " + S_UUID + " does not exist");
      }
      successful_delete.message = "Successfully removed a parking lot";
      successful_delete.S_UUID = S_UUID;
      return resolve(successful_delete);
    });
  });
};

