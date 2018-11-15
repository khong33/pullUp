const secret = require('../config/secret');
const request = require('request');


exports.findZip = (LAT, LON) => {
  return new Promise( (resolve, reject) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LON}&key=${secret.GOOGLE_CREDENTIAL}`;
    request(url, (err, res, body) => {
      const defaultZipcode = 30318;
      if (err || !body) {
        return resolve(defaultZipcode);
      }
      const results = JSON.parse(body).results;
      if (!results || results.length == 0 || !results[0]) {
        return resolve(defaultZipcode);
      }
      const firstAddress = results[0].formatted_address.replace(/,/g, '');
      const elements = firstAddress.split(" ");
      return resolve(elements[elements.length - 2]);
    })

  })
}


// TODO: Utilize Google Map API for easy Parking-Lot Creation

// const request = require('request');

// exports.getLocationInformation = (req, res, next) => {
//     const address = req.params.keyword;
//     const apiKey = ";
//     let first = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + address;
//     let remain = '&inputtype=textquery&fields=geometry/location,formatted_address,name,opening_hours,rating' + apiKey;
//     const url = first + remain;
//     request(url, function (error, response, body) {
//         console.log('error:', error); // Print the error if one occurred
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the HTML for the Google homepage.
//     });
