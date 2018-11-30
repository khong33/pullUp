const userModel = require('../models/userModel');
const reservationController = require('./reservationController');
const attr = require('dynamodb-data-types').AttributeValue;
const secret = require('../config/secret');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
    // BODY_ email, password
    const UUID = secret.hasher(req.body.email);
    userModel.verifyByUUID(UUID)
        .then(verification => {
            if (verification.isUnique) {
                res.send({ 
                    success: false, 
                    message: 'No UUID Found.' 
                  });
            }
            return userModel.getById(UUID);
        })
        .then(userData => {
            const hashedPW = secret.hashPassword(req.body.password, UUID + userData.licensePlate);
            if (userData.password != hashedPW) {
                res.send({ 
                    success: false, 
                    message: 'Password Not Matching.' 
                  });
            }
            const payload = {
                UUID: userData.UUID
            }
            return jwt.sign(payload, secret.API_KEY, {
                expiresIn: "1h" // expires in 1 hours
            });
        })
        .then(token=> {
            res.send({
                success: true,
                message: 'Issued Token!',
                UUID: UUID,
                token: token
              });
        })
        .catch(err =>res.status(403).send({ 
            success: false, 
            message: 'Error: Unauthorized to retrieve the user instance',
            UUID: UUID}
        ));
}

exports.createUser = async (req, res, next) => {
    if (!req.body.UUID || !req.body.password) {
        res.status(500).send({ 
            success: false, 
            message: 'Error: Failed to create an account'});
    }
    userModel.postAccountInfo(req.body)
        .then(obj => res.send(obj))
        .catch(err => {
            res.status(500).send({ 
            success: false, 
            message: 'Error: Failed to create an account'});
        });
    }

exports.getUser = async (req, res, next) => {
    const UUID = req.params.UUID;
    const headerUUID = req.headers.uuid;
    if (!UUID) {
        res.status(500).send({ 
            success: false, 
            message: 'Error: UUID is missing in the params' 
          });
    }
    if (UUID != headerUUID) {
        res.status(403).send({ 
            success: false, 
            message: 'Error: Unauthorized to retrieve the user instance',
            UUID: UUID 
          });
    }
    userModel.getById(UUID)
        .then(userData => {
            delete userData.password;
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
    const UUID = req.params.UUID;
    if (!UUID) {
        res.status(400).send({ 
            success: false, 
            message: 'Error: Parameter UUID is missing.',
            UUID: UUID 
          });
    }
    userModel.verifyByUUID(UUID)
        .then(verification => res.send(verification))
        .catch(err => next(err));
}
