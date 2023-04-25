const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log(`Router loaded`);

router.get('/', homeController.home);
router.get('/about', homeController.about);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/friend_req', require('./friendShip'));

router.use('/api', require('./api'));
// for any further routes access it from here
//for example router.use('/abcfile', require('./filelocation')); like above



module.exports = router;