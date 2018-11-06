const registration_model = require('../models/registration_model');


exports.create_userobj = async (req, res, next) => {
    // boolean: user_duplicate_check()
    registration_model.create_signup(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

/* TODO - Ronald

const user_duplicate_check


*/