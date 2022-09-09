const Joi = require('joi');

const addUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(64),
});

module.exports = {
    addUserSchema
}