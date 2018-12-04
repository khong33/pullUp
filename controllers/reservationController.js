const reservationModel = require('../models/reservationModel');
const spotModel = require('../models/spotModel');
const attr = require('dynamodb-data-types').AttributeValue;
const secret = require('../config/secret');

exports.queryTimeSlots = async (req, res, next) => {
    if (req.query && req.query.SUUID && req.query.date) {
        reservationModel.queryByDateSUUID(req.query, next)
            .then(obj => res.send(obj))
            .catch(err => next(err));
    } else {
        next("Error: Wrong query parameters");
    }
}

exports.queryHistory = async (req, res, next) => {
    return reservationModel.queryByUUID(req, next)
        .then(obj => {return obj})
        .catch(err => next(err));
}

exports.readReservation = async (req, res, next) => {
    const RUUID = req.params.RUUID;
    if (!RUUID) {
        res.status(400).send({
            success: false,
            message: "Error: Requirement for the body not satisfied"
        })
    }
    reservationModel.getById(RUUID)
        .then(response => res.send(response))
        .catch(err => next(err));
}

exports.createReservation = async (req, res, next) => {
    const body = req.body;
    const headerUUID = req.headers.uuid;
    if (!body.UUID || !body.SUUID || !body.time || !body.date) {
        res.status(400).send({
            success: false,
            message: "Error: Requirement for the body not satisfied",
        })
    }
    if (body.UUID != headerUUID) {
        res.status(403).send({
            success: false,
            message: "Error: Not authorized to create reservation for the specified UUID.",
        })
    }
    const RUUID = secret.hasher(body.SUUID + body.UUID + body.date + body.time);
    reservationModel.getById(RUUID)
        .then(response => {
            if (response.success) {
                res.status(400).send({
                    success: false,
                    message: "Reservation already exists for given parameters"
                })
            } else {
                return reservationModel.postById(RUUID, body);
            }
        })
        .then(obj => {
            if (obj.date === obj.cdate && obj.time === obj.ctime) {
                return spotModel.putById({
                    avail: "true",
                    SUUID: obj.SUUID,
                });
            } else {
                res.status(200).send(obj);
            }
        })
        .then(obj => {
            res.status(200).send({
                success: true,
                message: "Successfully made reservation"
            })
        })
        .catch(err => {
            next(err)
        });
}

exports.deleteReservation = async (req, res, next) => {
    const RUUID = req.params.RUUID;
    if (!RUUID) {
        res.status(400).send({
            success: false,
            message: "Error: Parameter is missing RUUID.",
        })
    }
    reservationModel.getById(RUUID)
        .then(response => {
            if (!response.success) {
                res.status(400).send({
                    success: false,
                    message: "Error: Specified RUUID does not exist.",
                })
            } else {
                const SUUID = response.item.SUUID;
                return spotModel.putById({
                    SUUID: SUUID,
                    avail: "true"
                });
            }
        })
        .then((res) => {
            return reservationModel.deleteById(RUUID);
        })
        .then(response => res.send(response))
        .catch(err => next(err));
}