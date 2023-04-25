const express = require('express');

const router = express.Router();
const passport = require('passport');
const PostsApi = require('../../../controllers/api/v1/post_api');

router.get('/', PostsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), PostsApi.destroy);

module.exports = router;