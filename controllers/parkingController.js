const parkingModel = require('../models/parkingModel');
const spotController = require('./spotController');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createParkingLot = async (req, res, next) => {
    body = attr.wrap(req.body);
    parkingModel.postById(body)
        .then(
            parkingResponse => {
                const spots = parkingResponse.spots;
                const promises = [];
                for (i = 0; i < spots.length; i++) {
                    let postParam = {};
                    postParam.PUUID = parkingResponse.PUUID;
                    postParam.SUUID = spots[i];
                    promises.push(spotController.createSpot(postParam, res, next))
                }
                return (Promise.all(promises), parkingResponse);
            })
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.getParkingLot = async (req, res, next) => {
    parms = attr.wrap(req.params);
    parkingModel.getById(parms)
        .then(obj => res.send(attr.unwrap(obj.Item)))
        .catch(err => next(err));
}

exports.deleteParkingLot = async (req, res, next) => {
    parkingModel.deleteById(req.params)
        .then(obj => res.send(obj))
        .catch(err => next(err));
    // TODO: implement delete associated S_UUIDs
}

exports.findNearByParking = async (req, res, next) => {
    parkingModel.getByCoordinates(req.params)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}


const findDistance = (origin, destination) => {

//https://maps.googleapis.com/maps/api/distancematrix/json?origins= <ORIGIN> &destinations=San+Francisco|Victoria+BC&key=YOUR_API_KEY
}




