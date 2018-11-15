const spotModel = require('../models/spotModel');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createSpot = async (req, res, next) => {
    spotModel.postById(req, res)
        .then(obj => {return obj;})
        .catch(err => next(err));
}

exports.readSpot = async (req, res, next) => {
    if (!req.params || !req.params.SUUID) {
        next("Error: SUUID Not referenced.");
    }
    spotModel.getById(req.params.SUUID, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.bulkReadSpots = async (req, res, next) => {
    spotList = req.body.spots;
    if (!spotList || spotList.length == 0) {
        next("Error: SpotList not Found.");
    }
    promiseArr = [];
    for (i = 0; i < spotList.length; i++) {
        promiseArr.push(spotModel.getById(spotList[i], res));
    }
    Promise.all(promiseArr)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.updateSpot = async (req, res, next) => {
    spotModel.putById(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.deleteSpot = async (req, res, next) => {
    spotModel.deleteById(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
    // TODO: DELETE SUUID from PUUID Object as well
}