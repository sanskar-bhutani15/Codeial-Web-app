const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/signup');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    (email, password, done) =>{
        User.findOne({email: email}, (err, user)=>{
            if(err){
                console.log('error in finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }else{
                return done(null, user);
            }   
        })
    }
))