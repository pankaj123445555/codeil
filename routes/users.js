
const passport = require('passport');
const express = require('express');

const router = express.Router();

console.log('router is loaded');
const user_contoller = require('../controllers/user_controller');
 
router.get('/signin',user_contoller.signin); 
 router.get('/signup',user_contoller.signup); 

router.get('/profile',passport.checkAuthentication,user_contoller.profile);

//  finally hamara form yaha jaayega
router.post('/create',user_contoller.create);

// adding the sign in page
// use passposrt as a middleware
router.post('/create-Session',passport.authenticate(   //doubt hai
    'local',
    {failureRedirect: '/user/signin'},
),user_contoller.createSession);

// creating a routes for the sign out link
router.get('/sign-out',user_contoller.destroySession);

 
module.exports = router;