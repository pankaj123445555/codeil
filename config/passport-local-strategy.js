const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// inport user
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true

},
function(req,email,password,done){
// find a user and establish identity
User.findOne({email:email},function(err,user){
    // if it is error in finding the user
    if(err)
    {
        req.flash('error','error in finding the user');
        return done(err);
    }
    // if the user is not found or password doesnot match upar dekho humne email se user ko search kar rahe hai
    if( !user||user.password!=password)
    {
        req.flash('error','invalid user');
        return done(null,false);
    }
    // if the user is found then we send the user itself 
    return done(null,user);
});
}


));
// serialization the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    console.log(user);
    return done(null,user.id);
});
// deserialization the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('error in finding he user id',err);
            return done(err);
        }
        return done(null,user);
    });
});

// check authentication this function act as a middleware
passport.checkAuthentication = function(req,res,next)
{
    // if the user is signed in pass request to the next function
    if(req.isAuthenticated())
    {
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        // req.user is contain the current signed un user from the session cookie and we are just sending this to the local for the view
        res.locals.user = req.user;
        // console.log(locals.user);
    }
    next();
}




// export the passport 
module.exports = passport;