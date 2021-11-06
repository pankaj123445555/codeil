
const { application } = require('express');
const express = require('express');
const passport = require('passport');

const router = express.Router();

console.log('router is loaded');

const home_contoller = require('../controllers/home_controller');
router.get('/',home_contoller.home); 
router.get('/add-friends',passport.checkAuthentication,home_contoller.addFriend);
router.use('/user',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
 router.use('/api',require('./api'));
 router.use('/likes',require('./likes'));
module.exports = router;