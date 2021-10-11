const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({

 clientID: "139699782967-fvvgo1i5av2k6o87qr5gohoeller6pl9.apps.googleusercontent.com",
 clientSecret: "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",
 callbackURL: "http://localhost:8000/user/auth/google/callback",
},

function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err)
        {
            console.log('error in accessing the token',err);
            return;
        }
        console.log(profile);
        if(user)
        {
            // if user is found
            return done(null,user);
        }
        else
        {
            // if not found create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err)
                {
                    console.log('error in creating a user in google oauth',err)
                    return;
                }
                return done(null,user)
            })
        }
    })
}
));


// export the passport to use in main index.js file
module.exports = passport;