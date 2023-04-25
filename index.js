const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const Logger = require('morgan');
const app = express();
require('./config/veiw-helper')(app);
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const signUp = require('./models/user');
// const login = require('./models/login');


//use for session cookie
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local');
const passportJwt = require('./config/passport-jwt');
const passportGoogleStrategy = require('./config/passport-google-oauth');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//setup the chat server to be used with socket.io

const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(3000);
console.log('server up and runnuing', chatServer);
const path = require('path');
console.log('Here is the env name----', env.name);

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(env.asset_path));
//path for uploads
app.use('/uploads', express.static(path.join(__dirname+'/uploads')));
app.use(Logger(env.morgan.mode, env.morgan.options));
app.use(express.json());
app.use(expressLayout);



//extract styles and scripts from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Mongostore is used to store the session cookie into the db
app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        // secure: true,
        maxAge: (1000*60*1000)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    },
        function(err){
            console.log(err || 'connect-mongo setup is checked and running');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use the router
app.use('/', require('./routes/entry'));

app.listen(port, (err) => {
    if(err){
        console.log(`Error in running server on port: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
});