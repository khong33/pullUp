const dotenv = require("dotenv");
const appRoot = require('app-root-path');
const winston = require('winston');
dotenv.config();

let options = {
    // file: {
    //   level: 'info',
    //   filename: `${appRoot}/logs/app.log`,
    //   handleExceptions: true,
    //   json: true,
    //   maxsize: 5242880,
    //   maxFiles: 5,
    //   colorize: false,
    // },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        // new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
};

module.exports = logger;