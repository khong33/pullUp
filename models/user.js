var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');
var reservation = require('./reservation')

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
	TableName : 'user',
	Key: {
	  "u_id": ""
	}
  };


// NOT NECESSARY AT THE MOMENT
// GET - find All user info
// var findAll = (req, res) => {
// 	params.Key.u_id = req;
// 	docClient.get(params, res, function (err, data) {
// 		if (err) {
// 			console.log("ERROR: " + err);
// 			return res.send(JSON.stringify(err, null, 2));
// 		}
// 		return res.send(JSON.stringify(data, null, 2));
// 	})
// }

// GET - find Info by id
function findInfoById(req, res) {
	params.Key.u_id = req;
	docClient.get(params, res, function (err, data) {
		if (err) {
			console.log("ERROR: " + err);
			return res.send(JSON.stringify(err, null, 2));
		}
		return res.send(JSON.stringify(data, null, 2));
	})
}


// GET - find Reservation by id
function findReservationById (req, res) {
	params.Key.u_id = req;
	var user_id = docClient.get(params, res, function (err, data) {
		if (err) {
			console.log("ERROR: " + err);
			return res.send(JSON.stringify(err, null, 2));
		}
		return res.send(JSON.stringify(data, null, 2));
	})
}


module.exports = {findInfoById, findReservationById}