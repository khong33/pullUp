const logger = require("./logger");
const AWS_ACCESSID = process.env.AWS_ACCESSID;
const AWS_SECRETKEY = process.env.AWS_SECRETKEY;
const crypto = require('crypto');

if (!AWS_ACCESSID || !AWS_SECRETKEY) {
    logger.error("AWS Credentials Not Found. Export credentials before running the program.");
    process.exit(1);
}

if (!process.env.GOOGLE_CREDENTIAL) {
    logger.error("Google Credentials Not Found. Export credentials before running the program.");
    process.exit(1);
}
exports.AWS_CREDENTIALS = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": AWS_ACCESSID,
    "secretAccessKey": AWS_SECRETKEY
}
exports.GOOGLE_CREDENTIAL = process.env.GOOGLE_CREDENTIAL;

exports.hasher = (value) => {
    return crypto.createHash('md5').update(value).digest("hex");
}