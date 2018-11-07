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

  var get_params = {
	Key: {},
	TableName : 'parking'
  };
  
  
  var put_params = {
	  Item: {
		"r_id": "", // unique reservation id
    	"s_id": "",
    	"u_id": "", // Spot 23 is part of p_id:3
    	"p_id": "", 
	  	},
	  TableName : 'reservation',
	};
  
  var successful_reserve = {
	"message": "",
	"U_UUID": "",
	"R_UUID": "",
	"P_UUID": "",
	"S_UUID": ""
  } 


  exports.createOne = (body) => {
	return new Promise((resolve, reject) => {
	  if (!body || !body.U_UUID || !body.R_UUID || !body.P_UUID || !body.S_UUID) {
		return reject("Requirement for the body not satisfied");
	  }
	  put_params.Item = body;
	  put_params.Item["R_UUID"] = {"S": R_UUID}; // Reservation ID
	  put_params.Item["S_UUID"] = {"SS": S_UUID}; // Spot ID
		put_params.Item["P_UUID"] = {"S": U_UUID}; //
		put_params.Item["U_UUID"] = 
	  dynamodb.putItem(put_params, function (err, response) {
		if (err) {
		  reject(err);
		}
		successful_create.message = "Successfully created a reservation";
		successful_create.P_UUID = P_UUID;
		successful_create.P_UUID = R_UUID;
		successful_create.P_UUID = U_UUID;
		successful_create.S_UUID = S_UUID;
		return resolve(successful_create);
	  });
	});
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