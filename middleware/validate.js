const httpStatus = require("http-status");
const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const body = req.body;
    const { error, value } = Joi.compile(schema).validate(req.body);
    if( error ){
        return next( res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message }) );
    }
    req.body = value;
    next();
}

module.exports = validate;