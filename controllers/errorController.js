const Boom = require('boom')

exports.error404 = (req, res) => {     //Error handle for ID not found
    const casenum = req.body //case number for appropiate case
    switch (casenum) {
        case 0:
        const PUUID = req.body.puuid;
            return res.json(Boom.notFound("Error: Parking lot with PUUID: " + PUUID + " does not exist"))
        case 1:
        const UUID = req.body.uuid;
            return res.json(Boom.notFound('Error: User ID with UUID: ' + UUID + ' does not exist '))
        case 2:
        const SUUID = req.body.suuid;
            return res.json(Boom.notFound("Error: Spot with SUUID: " + SUUID + " does not exist"))
        case 3:
        const RUUID = req.body.ruuid;
                return res.json(Boom.notFound("Error: Resevration with RUUID: " + RUUID + " does not exist"))
        default: 
            return res.json(Boom.badRequest("Error: Invalid Request"))
    }
}
// }  {
//     "statusCode": 404,
//     "error": "Not Found",
//     "message": "Unidentified ID"
// }
    
    
exports.errorbody400 =  (req, res) => { //missing parameters for api calls
    const casenum = req.body //case number for appropiate case
    switch (casenum) {
        case 0:
            return res.json(Boom.badRequest("Error: Name, Zip, Latitude, Longitude are Required."))
        case 1:
            return res.json(Boom.badRequest("Error: Latitude, Longitude, Zip are required"))
        case 2:
            return res.json(Boom.badRequest("Error: Requirement for the body not satisfied"))
        case 3:
            return res.json(Boom.badRequest("Error: 'True' or 'False' values valid only for udate request"))
        case 4:
            return res.json(Boom.badRequest("Error: Time slot must be in between 0 and 48"))
        default: 
            return res.json(Boom.badRequest("Error: Error occured during request"))
    }
}  
//{
//    "statusCode": 400,
//    "error": "Bad Request",
//    "message": "invalid query"
//}

exports.unauthorized401 =  (req, res) => { //unathorized request
    const body = req.body;
    switch (casenum) {
        case 0:
        return res.json(Boom.unauthorized('Error: Unauthorized to retrieve the user instance'))
        case 1:
        return res.json(Boom.unauthorized('Error: Invalid password'))
        case 2:
            return res.json(Boom.notFound("Error: Query paramter not set"))
        default: 
            return res.json(Boom.badRequest("Error: Invalid Request"))
    }
}
//"payload": {
//    "statusCode": 401,
//    "error": "Unauthorized",
//    "message": "invalid password"
//},
//"headers" {}