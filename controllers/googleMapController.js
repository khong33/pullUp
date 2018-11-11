const request = require('request');


exports.getLocationInformation = (req, res, next) => {
    const address = req.params.keyword;
    const apiKey = "AIzaSyBXhosmlTZH01Aw9hZ2y5WIpoGPEjwiYAE";
    let first = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + address;
    let remain = '&inputtype=textquery&fields=geometry/location,formatted_address,name,opening_hours,rating' + apiKey;
    const url = first + remain;
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

}
