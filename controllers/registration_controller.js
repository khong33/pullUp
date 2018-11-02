const registration_model = require('../models/registration_model');


exports.post_signup_byid = async (req, res, next) => {
    registration_model.post_signup(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}