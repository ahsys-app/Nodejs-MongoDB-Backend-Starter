const passport = require('passport');
const passportJwt = require('passport-jwt');
const logger = require('./logger');
const Keys = require("./keys");

const StrategyJwt = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;

const userModel = require('../models/user')

passport.use(
    new StrategyJwt(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (jwtPayload, done) => {
            logger.d(`jwtPayload: ${jwtPayload}`)
            try{
                await userModel.findOne({ _id: jwtPayload.id })
                    .then((user) => done(null, user))
                    .catch((err) => {
                        logger.e(err);
                        return done(null, false);
                    });
            }catch (e){
                return done(null, false);
            }
        }
    )
)

module.exports = {
    initialize: () => passport.initialize(),
    authenticate: passport.authenticate(Keys.jwt, { failureMessage: true }),
};
