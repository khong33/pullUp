const registration_model = require('../models/registration_model');


exports.create_signup_byid = async (req, res, next) => {
    registration_model.create_signup(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}