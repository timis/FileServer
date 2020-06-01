const JwtStrategy = require("passport-jwt").Strategy
const  ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("./database");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "supersecret";

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.getUserByID()
            .then(user => {
                if(user){
                    return done(null,user);
                } else {
                    return done(null,false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        })
    )
}