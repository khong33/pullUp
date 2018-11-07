const reservationModel = require('../models/reservationModel');
const userController = require('./userController')


exports.readReservation = async (req, res, next) => {
    reservationModel.reserve_single(req.body, next)
        .then(obj => res.send(obj))
        .catch(err => next(err));
    res.render('reservation');
}

exports.createReservation = async (req, res, next) => {    //reate reservation mapping S_UUID to U_UUID in table
    reservationModel.createOne(req.body, next)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.readReservation = async (req, res, next) => {  

}


exports.updateReservation = async (req, res, next) => {

}

exports.deleteReservation = async (req, res, next) => {

}
