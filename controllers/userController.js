const userModel = require('../models/userModel');
const reservationController = require('./reservationController');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        next("Error: Not enough information to create a user.")
    }
    userModel.postAccountInfo(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.getUser = async (req, res, next) => {
    if (!req.body.UUID) {
        next("Error: Not enough Information in the body");
    }
    const UUID = req.body.UUID;
    userModel.getById(UUID)
        .then(userData => {
            const values = [userData, reservationController.queryHistory(userData.UUID)];
            return Promise.all(values);
        })
        .then((values) => {
            const userData = values[0];
            const historyData = values[1];
            userData.reservation = historyData;
            res.send(userData);
        })
        .catch(err => next(err));
}

exports.verifyUser = async (req, res, next) => {
    if (!req.body.UUID) {
        next("Error: Not enough Information in the body");
    }
    const UUID = req.body.UUID;
    userModel.verifyByUUID(UUID)
        .then(verification => res.send(verification))
        .catch(err => next(err));
}

exports.updateUser = async (req, res, next) => {

}
