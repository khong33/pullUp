const logger = require("./logger");
const AWS_ACCESSID = process.env.AWS_ACCESSID;
const AWS_SECRETKEY = process.env.AWS_SECRETKEY;
// export const GOOGLE_CREDENTIALS = process.env["GOOGLE_CREDENTIALS"];

if (!AWS_ACCESSID || !AWS_SECRETKEY) {
    logger.error("AWS Credentials Not Found. Export credentials before running the program.");
    process.exit(1);
}

exports.AWS_CREDENTIALS = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": AWS_ACCESSID,
    "secretAccessKey": AWS_SECRETKEY
}


// if (!GOOGLE_CREDENTIALS) {
//     logger.error("Google Credentials Not Found. Export credentials before running the program.");
//     process.exit(1);
// }
