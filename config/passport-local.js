const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email' ,
    passReqToCallback: true
    },
    
    (req, email, password, done) =>{
        User.findOne({email: email}, (err, user)=>{
            // console.log(user);
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function (user, done){
    return done(null, user.id);
});

//deserializing the user from the key in the cookie

passport.deserializeUser(function (id, done){
    
    User.findById(id, function(err, user){
        
        if(err){
            console.log("error in finding user --> passport");
            return done(err);
        }
        // console.log(id);
        return done(null, user);
    })
});

//check if user is authenticated or not
passport.checkAuthentication  = (req, res, next)=>{
    if(req.isAuthenticated){

        return next();
    };

    //if user is not signed in 
    return res.redirect('/users/logIn');
};

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated){
        res.locals.user = req.user;
        // console.log(req.user);
    }
    next();
};

module.exports = passport; 