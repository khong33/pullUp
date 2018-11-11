const spotModel = require('../models/spotModel');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createSpot = async (req, res, next) => {
    spotModel.postById(req, res)
        .then(obj => {return obj;})
        .catch(err => next(err));
}

exports.readSpot = async (req, res, next) => {
    spotModel.getById(req.params, res)
        .then(obj => res.send(attr.unwrap(obj.Item)))
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
}