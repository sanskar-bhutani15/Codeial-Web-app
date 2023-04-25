const passport = require('passport');
const env = require('../config/environment');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport its a google strategy
passport.use(new googleStrategy({
    clientID: env.google_client_Id,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_callback_Url,
    passReqToCallback: true,
},
function(req, accessToken, refreshToken, profile, done){
    //find the user
    try{
    User.findOne({email: profile.emails[0].value}, function(err, user){
        if(err){
            console.log('Error in google Strategy', err);
            return;
        }
        if(user){
            // if founc, setthis user as req.user
           return done(null, user);
        
        }else{
            //if not the create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
                function(err, user){
                if(err){
                    console.log('Error in google Strategy', err);
                    return;
                }
                return done(null, user);
            });
        }
    });
}catch(err){
    console.log('>>>> error is:',err);
}
})
);



module.exports = passport;