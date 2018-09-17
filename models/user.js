var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

//Read config values from a JSON file.
var config = fs.readFileSync("../credentials/aws_secrets.json", 'utf8');
config = JSON.parse(config);

AWS.config.update({
	region : config.region,
	endpoint : config.endpoint,
	accessKeyId : config.accessKeyId,
	secretAccessKey : config.secretAccessKey
});


//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

// findAllUsers
// findInfoById
// findReservationById