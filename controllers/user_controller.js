const user_model = require('../models/user_model');



exports.create_user = async (req, res, next) => {
    // boolean: user_duplicate_check()
    user_model.create_signup(req.body, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}
