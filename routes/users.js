const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');
console.log('Users router loaded');

router.get('/userProfile',passport.checkAuthentication, usersController.userProfile);
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/bio', usersController.bio);
router.get('/signUp', usersController.signUp);
router.get('/logIn', usersController.logIn);
router.post('/create', usersController.create);

//use passport as middleware to authenticate
router.post('/createSession', passport.authenticate('local', {failureRedirect: '/users/logIn'}) ,usersController.createSession);


router.get('/signOut', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/logIn', successRedirect: '/'})); 

module.exports = router;