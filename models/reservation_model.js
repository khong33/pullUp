var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');


//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


// findAll
// findById
// findByIdAndRemove

var params = {
	TableName : 'reservation',
	Key: {
	  "r_id": ""
	}
  };


function findById(req, res) {
    params.Key.r_id = req;
    console.log(params)
	docClient.get(params, res, function (err, data) {
		if (err) {
			console.log("ERROR: " + err);
			return res.send(JSON.stringify(err, null, 2));
        }
		return res.send(JSON.stringify(data, null, 2));
	})
}


module.exports = {findById}
