const express = require('express');
const passport = require('passport');

const router = express.Router();

console.log(' comment router is loaded');

const commentContoller = require('../controllers/comment_controller');
// agar user ne form create kar bhi liya toh vah database mai save nahi kar payyega 
// jaise ki koi banda edit as html mai jaa kar form create kar leta hai post post karne ka toh bhi vah hamare database tak nahi pahuch payyega
router.post('/create',passport.checkAuthentication, commentContoller.create); 

// deleting a comment
router.get('/destroy/:id',passport.checkAuthentication,commentContoller.destroy);
// ending of deleting a comment

// router.get('/profile',home_contoller.profile);
module.exports = router;