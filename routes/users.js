
const passport = require('passport');
const express = require('express');

const router = express.Router();

console.log('router is loaded');
const user_contoller = require('../controllers/user_controller');
 
router.get('/signin',user_contoller.signin); 
 router.get('/signup',user_contoller.signup); 

router.get('/profile/:id',passport.checkAuthentication,user_contoller.profile);
// now its time to add a friend
router.get('/add-friend/:id',passport.checkAuthentication,user_contoller.Friend);
// ending of adding a friend

//  finally hamara form yaha jaayega
router.post('/create',user_contoller.create);
// ending the create section

// setting up the google authentication function

// scope is just pass for fetching the information
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/user/signin'}),user_contoller.createSession);
// ending up the google auhtentication function


// router for updating the profile

router.get('/update-page/:id',passport.checkAuthentication,user_contoller.updatePage);

router.post('/update/:id',passport.checkAuthentication,user_contoller.update);


// ending of router for updating the profile


 
 







// adding the sign in page
// use passposrt as a middleware
router.post('/create-Session',passport.authenticate(   
    'local',
    {failureRedirect: '/user/signin'},
),user_contoller.createSession);

// creating a routes for the sign out link
router.get('/sign-out',user_contoller.destroySession);

 

 
module.exports = router;