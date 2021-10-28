const express = require('express');
const passport = require('passport');

const router = express.Router();

console.log('router is loaded');

const post_contoller = require('../controllers/post_controller');
// agar user ne form create kar bhi liya toh vah database mai save nahi kar payyega 
// jaise ki koi banda edit as html mai jaa kar form create kar leta hai post post karne ka toh bhi vah hamare database tak nahi pahuch payyega
router.post('/create',passport.checkAuthentication, post_contoller.create); 

// this is for temporary
// router.post('/creates',passport.checkAuthentication, post_contoller.creates); 
// we have to remove

// creating a model for the deleting a post
router.get('/destroy/:id',passport.checkAuthentication,post_contoller.destroy);
// ending of deleting a model
// router.get('/profile',home_contoller.profile);
module.exports = router;