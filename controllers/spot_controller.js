const spot_model = require('../models/spot_model');



exports.get_spot_byid = async (req, res, next) => {
    spot_model.get_byid(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.update_spot_byid = async (req, res, next) => {
    spot_model.post_byid(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.delete_spot_by_id = async (req, res, next) => {
    spot_model.delete_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}