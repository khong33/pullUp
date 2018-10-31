var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');
const randUUID = require('uuid/v4');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName : 'parking'
  };

// findParkingById
// findParkingByLocation

function postParkingLot(req, res) {
    params["Item"] = req;
    dynamodb.putItem(params, function (err, response) {
		if (err) {
            console.log(err, err.stack);
            return es.status(500).send();
        }
        return res.status(200).send();
	});
};


module.exports = {postParkingLot}
