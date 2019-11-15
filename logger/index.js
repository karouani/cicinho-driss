module.exports = class Logger {
    constructor() {
        var winston = require('winston');
        require('winston-daily-rotate-file');
        var config    = require('dotenv').config({path: '.env', overwrite: true}).parsed;
        this.transport = new (winston.transports.DailyRotateFile)({
            filename: `${config.FILE_NAME}`,
            datePattern: `${config.DATE_PATTERN}`,
            maxSize: `${config.MAX_SIZE}`,
            maxFiles: `${config.MAX_FILES}`,
            dirname : `${config.DIR}`,
            exitOnError: false,
            colorize: true
        });

        this.logger = winston.createLogger({
            transports: [
              this.transport
            ]
          });
    }

    info(txt){
        this.logger.info(txt);
    }

    error(txt){
        this.logger.error(txt);
    }

    warning(txt){
        this.logger.warn(txt);
    }
}