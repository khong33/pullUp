const geoController = require('./geoController');
const spotController = require('./spotController');

const parkingModel = require('../models/parkingModel');
const spotModel = require('../models/spotModel');

const secretHandler = require('../config/secret');
const attr = require('dynamodb-data-types').AttributeValue;
const euclidean = require('euclidean-distance');


exports.createParkingLot = async (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.zip || 
        !req.body.latitude || !req.body.longitude) {
        next("Error: name, zip, latitude, longitude are required.");
    } else {
        const PUUID = secretHandler.hasher(req.body.name);
        parkingModel.postById(attr.wrap(req.body), PUUID)
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
}

exports.getParkingLot = async (req, res, next) => {
    parkingModel.getById(attr.wrap(req.params))
        .then(obj => res.send(attr.unwrap(obj.Item)))
        .catch(err => next(err));
}

exports.deleteParkingLot = async (req, res, next) => {
    parkingModel.getById(attr.wrap(req.params))
        .then(rawObj => {
            return attr.unwrap(rawObj.Item);
        })
        .then(obj => {
            const spotArray = obj.spots;
            const promiseArray = [];
            for (i = 0; i < spotArray.length; i++) {
                promiseArray.push(spotModel.deleteById({"SUUID": spotArray[i]}, res));
            }
            return Promise.all(promiseArray);
        })
        .then(obj => res.send(parkingModel.deleteById(req.params)))
        .catch(err => next(err));
}


exports.findNearByParking = async (req, res, next) => {
    if (!req.query) {
        next("Error: Query paramter not set");
    }
    const currLat = req.query.latitude;
    const currLon = req.query.longitude;
    const size = req.query.size;
    const currZip = await geoController.findZip(currLat, currLon);
    if (!currLat || !currLon || !currZip) {
        next("Error: Latitude, Longitude, Zip are required");
    }
    parkingModel.getNearBy(currZip)
        .then(obj => {return obj})
        .then(parkingSameZip => {
            const destObjects = [];
            const currCoord = [currLat, currLon];
            for (i = 0; i < parkingSameZip.Items.length; i++) {
                destObjects.push(attr.unwrap(parkingSameZip.Items[i]));
            }
            let nearByParkingLots = nearbyCalculation(currCoord, destObjects);
            nearByParkingLots = sizeLimiter(nearByParkingLots, size);
            res.send(nearByParkingLots);
        })
        .catch(err => next(err));
}

const sizeLimiter = (nearestLots, size) => {
    const parkings = [];
    if (!size) {
        size = 5;
    }
    if (nearestLots.length < size) {
        size = nearestLots.length;
    }
    for (i = 0; i < size; i++) {
        parkings.push(nearestLots[i]);
    }
    return parkings;
}

const nearbyCalculation = (origin, destinations) => {
    for (i = 0; i < destinations.length; i++) {
        const dest = [destinations[i].latitude, destinations[i].longitude];
        destinations[i].distance = euclidean(origin, dest);
    }
    // sort
    destinations.sort(function(a, b) {
        return a.dist - b.dist;
    });
    return destinations;
};
