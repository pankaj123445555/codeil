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
// require the passport-jwt-strategy
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2');

const MongoStore = require('connect-mongo')(session);
// including scss module
const sassMiddleware = require('node-sass-middleware');

// adding flash library 
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
// ending flash libraray
 

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
// join the path
app.use('/uploads',express.static(__dirname + '/uploads'));

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
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove: 'disable'
    }, function(err){
        console.log('error in connecting to mongo store'||'connect mongodb server setup completed')
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// using flash this using session cookie
app.use(flash());
app.use(customMiddleware.createflash);
// end

app.use('/',require('./routes/index'));






app.listen(port,function(error){
   if(error)
   {
       console.log(`error is running the server: $(error)`);
       return;
   }
   console.log(`server is running on the port: ${port}`);
});
