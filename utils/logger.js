require('dotenv').config();
const log4js = require('log4js');

log4js.configure({
    appenders: { console: { type: 'console' } },
    categories: { default: { appenders: ['console'], level: process.env.LOG_LVL } }
});

const logger = log4js.getLogger();
logger.level = process.env.LOG_LVL;

class Logger {

    static d(message) {
        logger.debug(message);
    }

    static i(message) {
        logger.info(message);
    }

    static dWithParams(message, params) {
        logger.info(params);
        logger.debug(message);
    }

    static dWithObj(message, obj) {
        logger.info(obj);
        logger.debug(message);
    }

    static log(req, res, message) {
        logger.info(req);
        logger.info(res);
        logger.info(message);
    }

    static e(error) {
        logger.error(error);
    }

    static error(req, error) {
        logger.error(`Error: ${req.method} ${req.originalUrl} \n Error Details: ${error}\n${error.stack}`);
    }
}

module.exports = Logger;
