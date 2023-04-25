const express = require('express');
const passport = require('passport');
const router = express.Router();

const freindshipController = require('../controllers/friendship_controller')

router.post('/sendRequest', passport.checkAuthentication, freindshipController.sendRequest);
router.put('/acceptrequest/:id', freindshipController.acceptRequest);

console.log('FriendReq router loaded');

module.exports = router;