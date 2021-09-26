
const express = require('express');

const router = express.Router();

console.log('router is loaded');

const home_contoller = require('../controllers/home_controller');
router.get('/',home_contoller.home); 
router.use('/user',require('./users'));
router.use('/posts',require('./posts'));
 
module.exports = router;