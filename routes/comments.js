const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment_controller');
console.log('Comments router loaded');

router.post('/create',passport.checkAuthentication, commentController.create);
router.get('/delete/:id', passport.checkAuthentication, commentController.delete);

module.exports = router;