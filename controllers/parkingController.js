const parkingModel = require('../models/parkingModel');
const spotModel = require('../models/spotModel');


exports.create_parkinglot = async (req, res, next) => {
    parkingModel.create_single(req.body, next)
        .then(parking_response => {
            const P_UUID = parking_response.P_UUID;
            const S_UUID_list = parking_response.S_UUID;
            var promises = [];
            for (i = 0; i < S_UUID_list.length; i++) {
                var S_UUID =  S_UUID_list[i];
                promises.push(spotModel.create_single_helper(S_UUID, P_UUID));
            }
            return (Promise.all(promises), parking_response) ;
        })
        .then(obj => res.send(obj))
        .catch(err => next(err));
}


exports.get_parkinglot_by_id = async (req, res, next) => {
    parkingModel.get_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.get_parkinglot_by_coord = async (req, res, next) => {
    parkingModel.get_by_coord(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
}

exports.delete_parkinglot_by_id = async (req, res, next) => {
    parkingModel.delete_by_id(req.params, res)
        .then(obj => res.send(obj))
        .catch(err => next(err));
    // TODO: implement delete associated S_UUIDs
}

exports.findNearByParking = async (req, res, next) => {
    const long =  req.params.long;
    const lat = req.params.lat;
    const zip = req.params.zip;


}


const findDistance = (origin, destination) => {
//https://maps.googleapis.com/maps/api/distancematrix/json?origins= <ORIGIN> &destinations=San+Francisco|Victoria+BC&key=YOUR_API_KEY
}




