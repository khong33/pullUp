const parking_model = require('../models/parking');
const spot_model = require('../models/spot');


exports.create_parkinglot = async (req, res, next) => {
    parking_model.create_single(req.body, next)
        .then(parking_response => {
            const P_UUID = parking_response.P_UUID;
            const S_UUID_list = parking_response.S_UUID;
            var promises = [];
            for (i = 0; i < S_UUID_list.length; i++) {
                var S_UUID =  S_UUID_list[i];
                promises.push(spot_model.create_single_helper(S_UUID, P_UUID));
            }
            return (Promise.all(promises), parking_response) ;
        })
        .then(obj => res.send(obj))
        .catch(err => next(err));
}


exports.get_parkinglot_byid = async (req, res, next) => {
    parking_model.get_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.delete_parkinglot_byid = async (req, res, next) => {
    parking_model.delete_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

