const reservationModel = require('../models/reservationModel');
const attr = require('dynamodb-data-types').AttributeValue;

const queryTimeSlots = async (req, res, next) => {
    reservationModel.queryByDateSUUID(req.query, next)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.queryHistory = async (req, res, next) => {
    return reservationModel.queryByUUID(req, next)
        .then(obj => {return obj})
        .catch(err => next(err));
}

exports.readReservation = async (req, res, next) => {
    if (req.query && req.query.SUUID && req.query.date) {
        queryTimeSlots(req, res, next);
    } else {
        reservationModel.getById(attr.wrap(req.params), next)
            .then(obj => res.send(attr.unwrap(obj.Item)))
            .catch(err => next(err));
    }
}

exports.createReservation = async (req, res, next) => {    //reate reservation mapping S_UUID to U_UUID in table
    reservationModel.postById(req.body, next)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}
/*
{
    "PUUID": ""
    "SUUID": ""
    "reservation":
}
*/
exports.deleteReservation = async (req, res, next) => {    //reate reservation mapping S_UUID to U_UUID in table
    reservationModel.deleteById(attr.wrap(req.params), next)
        .then(obj => res.send(attr.unwrap(obj.Item)))
        .catch(err => next(err));
}