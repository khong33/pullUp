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
    // TODO: implement delete associated SUUIDs
}

exports.findNearByParking = async (req, res, next) => {
    if (!req.query) {
        next("Query paramter not set");
    }
    const currLat = req.query.latitude;
    const currLon = req.query.longitude;
    const currZip = req.query.zip;
    const size = req.query.size;
    if (!currLat || !currLon || !currZip) {
        next("Latitude, Longitude, Zip are required");
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
        const dest = [destinations[i].lat, destinations[i].lon];
        destinations[i]["distance"] = euclidean(origin, dest);
    }
    // sort
    destinations.sort(function(a, b) {
        return a.dist - b.dist;
    });
    return destinations;
};




