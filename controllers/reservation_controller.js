const reservation_model = require('../models/reservation_model');




exports.create_reservation = async (req, res, next) => {    //reate reservation mapping S_UUID to U_UUID in table
    reservation_model.reserve_single(req.body, next)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}
