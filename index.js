// adding module express
const express = require('express');
const cookieParser = require('cookie-parser');
// adding all the functionality to the app which have in the express
const app = express();

const port = 8000;
const expresslayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
// including scss module
const sassMiddleware = require('node-sass-middleware');

// adding cookie


// ending the cookie

app.use(sassMiddleware({
    src: './assets/scss',
    dest:  './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());


// including layout 

// use the assets folder
app.use(express.static('./assets'));
app.use(expresslayouts);
// niche vali property jo css jod rahe hai usko header mai rakh degi
app.set('layout extractStyles',true);
// ending of the layout



// server is running on the port
// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// end up the view engine
app.use(session({
    name: 'codial',
    // todo change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));






app.listen(port,function(error){
   if(error)
   {
       console.log(`error is running the server: $(error)`);
       return;
   }
   console.log(`server is running on the port: ${port}`);
});
