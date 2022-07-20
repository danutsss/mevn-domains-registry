const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("../config/key");

const { Client } = require("../models/Client");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            Client.findById(jwt_payload.id)
                .then((client) => {
                    if (client) return done(null, client);
                    return done(null, false);
                })
                .catch((err) => {
                    return done(err, false, {
                        message: "server error: " + err.message,
                    });
                });
        })
    );
};
