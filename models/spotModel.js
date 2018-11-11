const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const attr = require('dynamodb-data-types').AttributeValue;

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
  UpdateExpression: "set avail = :val",
  ExpressionAttributeValues: {
    ":val": {}
  },
  TableName : 'spot',
};


var successful_response = {
  "Message": "",
  "SUUID": "",
  "PUUID": ""
}

exports.postById = (body) => {
  return new Promise((resolve, reject) => {
      if (!body || !body.SUUID || !body.PUUID) {
          return reject("Requirement for the body not satisfied");
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
      return reject("Requirement for the body not satisfied");
    }
    console.log(params);
    const SUUID = params.SUUID;
    const avail = params.avail;
    update_params.Key["SUUID"] = {"S": SUUID};
    update_params.ExpressionAttributeValues[":val"] = {"BOOL": Boolean(avail)};
    console.log(update_params);
    dynamodb.updateItem(update_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      return resolve("Successfully Updated " + SUUID + " to " + avail);
    });
  });
};


exports.getById = (params) => {
  return new Promise((resolve, reject) => {
    console.log(params);
    if (!params|| !params.SUUID) {
      return reject("Requirement for the body not satisfied");
    }
    var SUUID = params.SUUID;
    get_params.Key["SUUID"] = {"S": SUUID};
    dynamodb.getItem(get_params, function (err, response) {
      if (err) {
        return reject(err);
      }
      if ('{}' === JSON.stringify(response)) {
        return reject("Error: Unidenfied SUUID");
      }
      return resolve(response);
    });
  });
};


exports.deleteById = (params) => {
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

