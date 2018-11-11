const userModel = require('../models/userModel');
const reservationController = require('./reservationController');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createUser = async (req, res, next) => {
    // boolean: user_duplicate_check()
    userModel.postById(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.getUser = async (req, res, next) => {
    const UUID = req.params.UUID;
    userModel.getById(UUID)
        .then(obj => {
            const userData = attr.unwrap(obj.Item);
            return userData;
        })
        .then(userData => {
            const values = [];
            values.push(userData);
            values.push(reservationController.queryHistory(userData.UUID));
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

exports.updateUser = async (req, res, next) => {
    // const UUID = req.params.UUID;
    // userModel.findByUUID(UUID)
    //     .then(obj => {
    //         const unwrappedObj = attr.unwrap(obj.Item);
    //         res.send(unwrappedObj);
    //     })
    //     .catch(err => next(err));
}
