const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like_controller');

router.post('/toggle',likeController.toggleLike);

console.log('likes router is loaded');

module.exports = router;