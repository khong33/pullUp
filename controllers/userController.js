const userModel = require('../models/userModel');
const reservationController = require('./reservationController');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createUser = async (req, res, next) => {
    userModel.postById(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.getUser = async (req, res, next) => {
    const UUID = req.params.UUID;
    userModel.getById(UUID)
        .then(userData => {
            console.log("here1");
            console.log(userData);
            const values = [userData, reservationController.queryHistory(userData.UUID)];
            return Promise.all(values);
        })
        .then((values) => {
            console.log("here2");
            console.log(values);
            const userData = values[0];
            const historyData = values[1];
            userData.reservation = historyData;
            res.send(userData);
        })
        .catch(err => next(err));
}

exports.updateUser = async (req, res, next) => {

}
