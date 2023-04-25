const express = require('express');

const router = express.Router();
const LikeController = require('../controllers/likes_controller');
console.log('likes router loaded');

router.post('/toggle', LikeController.toggleLike);

module.exports = router;