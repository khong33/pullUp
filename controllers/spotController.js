const spotModel = require('../models/spotModel');



exports.get_spot_byid = async (req, res, next) => {
    spotModel.get_byid(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.update_spot_byid = async (req, res, next) => {
    spotModel.post_byid(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.delete_spot_by_id = async (req, res, next) => {
    spotModel.delete_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}