const passport = require('passport');
const env = require('../config/environment');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/user'); 
console.log(User);

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_secret_key
};
console.log(opts);

passport.use(new JWTStrategy(opts, function(jwt_payload, done){

    User.findById(jwt_payload._id, function(err, user){
        if(err){
            console.log('Error finding user from JWT');
            return;
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;
