var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

//Read config values from a JSON file.
AWS.config.loadFromPath('./credentials/aws_secrets.json');

//create a client object for dynamoDB
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
	TableName : 'user',
	Key: {
	  "s_id": ""
	}
  };

/*
  findAllByPId
  findOneBySId
  findBySIdAndUpdate
  findBySIdAndRemove
*/


function findOneBySId(req, res) {
	params.Key.s_id = req;
	docClient.get(params, res, function (err, data) {
		if (err) {
			console.log("ERROR: " + err);
			return res.send(JSON.stringify(err, null, 2));
		}
		return res.send(JSON.stringify(data, null, 2));
  })}
  

  function findBySIdAndUpdate(req, res) {
    params.Key.s_id = req;
    
    docClient.put(params, res, function (err, data) {
      if (err) {
        console.log("ERROR: " + err);
        return res.send(JSON.stringify(err, null, 2));
      }
      return res.send(JSON.stringify(data, null, 2));
    })}