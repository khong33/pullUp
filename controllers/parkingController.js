const parkingModel = require('../models/parkingModel');
const spotModel = require('../models/spotModel');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createParkingLot = async (req, res, next) => {
    body = attr.wrap(req.body);
    parkingModel.createSingle(body)
        .then(
            parkingResponse => {
                const Spots = parkingResponse.spots;
                const PUUID = parkingResponse.PUUID;
                var promises = [];
                for (i = 0; i < Spots.length; i++) {
                    promises.push(spotModel.create_single_helper(Spots[i], PUUID));
                }
                return (Promise.all(promises), parkingResponse);
            })
        .then(obj => res.send(obj))
        .catch(err => next(err));
}


exports.getParkingLot = async (req, res, next) => {
    parms = attr.wrap(req.params);
    parkingModel.getByPUUID(parms)
        .then(obj => res.send(attr.unwrap(obj.Item)))
        .catch(err => next(err));
}

exports.deleteParkingLot = async (req, res, next) => {
    parkingModel.deleteByPUUID(req.params)
        .then(obj => res.send(obj))
        .catch(err => next(err));
    // TODO: implement delete associated S_UUIDs
}

exports.findNearByParking = async (req, res, next) => {
    parkingModel.getNearBy(req.params)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}


const findDistance = (origin, destination) => {

//https://maps.googleapis.com/maps/api/distancematrix/json?origins= <ORIGIN> &destinations=San+Francisco|Victoria+BC&key=YOUR_API_KEY
}




