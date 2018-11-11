const userModel = require('../models/userModel');
const attr = require('dynamodb-data-types').AttributeValue;

exports.createUser = async (req, res, next) => {
    // boolean: user_duplicate_check()
    userModel.create_signup(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.processLogin = async (req, res, next) => {
    // req.id
    // req.pw
    // 1) hash req.hashed_id to get the UUID
    // 2) get UUID's hashed_pw
    // 2) req.hashed_pw  == hashed_pw
}

exports.showProfile = async (req, res, next) => {
    const UUID = req.params.UUID;
    userModel.findByUUID(UUID)
        .then(obj => {
            const unwrappedObj = attr.unwrap(obj.Item);
            res.send(unwrappedObj);
        })
        .catch(err => next(err));
}
