const express = require('express');
const passport = require('passport');

const router = express.Router();

console.log('router is loaded');

const post_contoller = require('../controllers/post_controller');
// agar user ne form create kar bhi liya toh vah database mai save nahi kar payyega 
// jaise ki koi banda edit as html mai jaa kar form create kar leta hai post post karne ka toh bhi vah hamare database tak nahi pahuch payyega
router.post('/create',passport.checkAuthentication, post_contoller.create); 

// router.get('/profile',home_contoller.profile);
module.exports = router;