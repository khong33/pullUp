const parkingModel = require('../models/parkingModel');
const spotController = require('./spotController');
const attr = require('dynamodb-data-types').AttributeValue;
const euclidean = require('euclidean-distance');

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
    if (!req.query) {
        next("Query paramter not set");
    }
    const currLat = req.query.lat;
    const currLon = req.query.lon;
    const currZip = req.query.zip;
    if (!currLat || !currLon || !currZip) {
        next("Latitude, Longitude, Zip are required");
    }
    parkingModel.getNearBy(currZip)
        .then(obj => {return obj})
        .then(parkingSameZip => {
            const currCoord = [];
            currCoord.push(currLat);
            currCoord.push(currLon);
            const nearestLots = nearbyCalculation(currCoord, parkingSameZip.Items);
            res.send(nearestLots);
        })
        .catch(err => next(err));
}


const nearbyCalculation = (origin, destinations) => {
    for (i = 0; i < destinations.length; i++) {
        const dest = [];
        dest.push(destinations[i].lat.S);
        dest.push(destinations[i].lon.S);
        destinations[i]["distance"] = euclidean(origin, dest);
    }
    // sort
    destinations.sort(function(a, b) {
        return a.dist - b.dist;
    });
    return destinations;
};




