/*****************************************************************/
/** DEPENDENCIES                                                  /
/*****************************************************************/
var express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	session = require('cookie-session'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose'),
	path = require('path'),
	port = 2000;
	
	// Connect mongoose
	mongoose.connect('mongodb://localhost/suse', function(err) {
		if (err) {
			console.log('Could not connect to mongodb on localhost!');
		}
	});

	var app = express();

/*****************************************************************/
/** MODELS                                                        /
/*****************************************************************/
var Account = require('./models/account.js');

/*****************************************************************/
/** MIDDLEWARE                                                    /
/*****************************************************************/
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(express.static(path.join(__dirname,'administrator')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({keys: ['jashdekjasdaj3333', 'askjdhiashfdhashd333', 'akfnbahfh444iurtgyw']}));
app.use(expressSession({
	secret: 'asdjahfha12131fhas',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// Routing
app.use(require('./routing'));

// Start server
app.listen(port, function(){
	console.log('SUSE is running on port ' + port );
});

