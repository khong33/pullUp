// const paymentModel = require('../models/paymentModel');

// exports.createTransaction = async (req, res, next) => {
//     if (!req.body || !req.body.name || !req.body.zip || 
//         !req.body.latitude || !req.body.longitude) {
//         next("Error: name, zip, latitude, longitude are required.");
//     } else {
//         const PUUID = secretHandler.hasher(req.body.name);
//         parkingModel.postById(attr.wrap(req.body), PUUID)
//             .then(
//                 parkingResponse => {
//                     const spots = parkingResponse.spots;
//                     const promises = [];
//                     for (i = 0; i < spots.length; i++) {
//                         let postParam = {};
//                         postParam.PUUID = parkingResponse.PUUID;
//                         postParam.SUUID = spots[i];
//                         promises.push(spotController.createSpot(postParam, res, next))
//                     }
//                     return (Promise.all(promises), parkingResponse);
//                 })
//             .then(obj => res.send(obj))
//             .catch(err => next(err));
//     }
// }
