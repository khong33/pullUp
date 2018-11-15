const logger = require('../config/logger');
const secret = require('../config/secret');
const AWS = require('aws-sdk');
const randUUID = require('uuid/v4');
const attr = require('dynamodb-data-types').AttributeValue;
const dynamodb = new AWS.DynamoDB();
const date = new Date();

AWS.config.update(secret.AWS_CREDENTIALS);

exports.queryByDateSUUID = (keys) => {
    return new Promise((resolve, reject) => {
        if (!keys || !keys.SUUID || !keys.date) {
            return reject("Error: Requirement for the body not satisfied");
        }
        const params = {
            TableName: "reservation",
            FilterExpression: "#sid = :sid_ and #dt = :dt_",
            ExpressionAttributeNames: {
                "#dt": "date",
                "#sid": "SUUID",
            },
            ExpressionAttributeValues: {
                ":dt_": {"S": keys.date},
                ":sid_": {"S": keys.SUUID},
           }
        };
        dynamodb.scan(params, function (err, response) {
            if (err || !response.Items) {
                return reject("Error: Error occured during request");
            }
            const times = new Array(48);
            for (i = 0; i < times.length; i++) {
                times[i] = {"id": i, "reserved": false};
            }
            const intervals = [];
            response.Items.forEach(item => {
                let i = Number(attr.unwrap(item).time);
                intervals.push(i);
            })
            intervals.forEach(interval => {
                times[interval].reserved = true;
                
            });
            return resolve(times);
        });
    });
}

exports.queryByUUID = (UUID) => {
    return new Promise((resolve, reject) => {
        if (!UUID) {
            return reject("Error: Requirement for the body not satisfied");
        }
        const params = {
            TableName: "reservation",
            FilterExpression: "#id = :id_",
            ExpressionAttributeNames: {
                "#id": "UUID",
            },
            ExpressionAttributeValues: {
                ":id_": {"S": UUID}
           }
        };
        dynamodb.scan(params, function (err, response) {
            if (err || '{}' === JSON.stringify(response)) {
                return reject("Error Occured during request");
            }
            const histories = [];
            for (i = 0; i < response.Items.length; i++) {
                const unwrapped = attr.unwrap(response.Items[i]);
                delete unwrapped["UUID"];
                histories.push(unwrapped);
            }
            return resolve(histories);
        });
    });
}

exports.queryReservations = (keys) => {
    return new Promise((resolve, reject) => {
        if (!keys || !keys.SUUID || !keys.date) {
            return reject("Error: Requirement for the body not satisfied");
        }
        var params = {
            TableName: "reservation",
            FilterExpression: "#id = :sid and #dt = :rdt",
            ExpressionAttributeNames: {
                "#dt": "date",
                "#id": "SUUID"
            },
            ExpressionAttributeValues: {
                ":rdt": {"S": keys.date},
                ":sid": {"S": keys.SUUID}
           }
        };
        dynamodb.scan(params, function (err, response) {
            if (err || '{}' === JSON.stringify(response)) {
                return reject("Error: Error occured during request");
            }
            const times = [];
            for (i = 0; i < response.Items.length; i++) {
                const unwrapped = attr.unwrap(response.Items[i]);
                times.push(unwrapped.time);
            }
            times.sort();
            return resolve(times);
        });
    });
}

exports.postById = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.UUID || !body.SUUID || !body.time || !body.date) {
            return reject("Error: Requirement for the body not satisfied");
        }
        if (Number(body.time) < 0 || Number(body.time) > 48) {
            return reject("Error: Time slot must be in between 0 and 48");
        }
        const postParams = {
            TableName: "reservation",
            Item: {}
        }
        const RUUID = randUUID();
        const wrappedItems = attr.wrap(body);
        const timestamp = date.toISOString();
        postParams.Item = wrappedItems;
        postParams.Item.RUUID = {"S": RUUID};
        postParams.Item.timestamp = {"S": timestamp};
        dynamodb.putItem(postParams, function (err, response) {
            if (err) {
                reject(err);
            }
            resolve({
                "Message": "Successfully instantiated " + RUUID,
                "RUUID": RUUID,
                "SUUID": body.SUUID,
                "time": body.time,
                "date": body.date,
                "timestamp": timestamp
            });
        });
    });
};

exports.getById = (params) => {
    return new Promise((resolve, reject) => {
      if (!params|| !params.RUUID) {
        return reject("Error: Requirement for the body not satisfied");
      }
      const getParms = {
          TableName: "reservation",
          Key: {}
      }
      getParms.Key.RUUID = params.RUUID;
      dynamodb.getItem(getParms, function (err, response) {
            if (err || !response) {
              return reject("Error: Invalid response.");
            }
            if ('{}' === JSON.stringify(response)) {
                return reject("Error: Unidenfied RUUID");
            }
            return resolve(response);
        });
    });
};
  

exports.deleteById = (params) => {
    // TODO: Error Handling when the RUUID item does not exist
    return new Promise((resolve, reject) => {
        if (!params || !params.RUUID) {
            return reject("Error: Requirement for the body not satisfied");
        }
        const deleteParms = {
            TableName: "reservation",
            Key: {}
        }
        deleteParms.Key.RUUID = params.RUUID;
        dynamodb.deleteItem(deleteParms, function (err, response) {
            if (err) {
                reject(err);
            }
            resolve({
                "Message": "Successfully deleted " + params.RUUID
            });
        });
    });
};