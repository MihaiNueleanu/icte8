/*****************************************************************/
/** DEPENDENCIES                                                  /
/*****************************************************************/
var express             = require('express'),
  bodyParser            = require('body-parser'),
  router                = express.Router(),
  passport              = require('passport'),
  LocalStrategy         = require('passport-local').Strategy,
  expressSession        = require('express-session'),
  cookieParser          = require('cookie-parser'),
  session               = require('cookie-session'),
  mongoose              = require('mongoose'),
  Schema                = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

/*****************************************************************/
/** MODELS                                                        /
/*****************************************************************/
var Account = require('../models/account.js');
var Company = require('../models/company.js');

/*****************************************************************/
/** Functions                                                     /
/*****************************************************************/
function companyByName(companyName,callback) {
  Company.findOne({ name: companyName },{name:1,description:1}, function (err, results) {
      if(err) { console.log(err); }      
      console.log(results);
      callback(results);
  });
}

/*****************************************************************/
/** ROUTING                                                       /
/*****************************************************************/
//Render registration page
router.get('/administrator/register', function(req, res) {
  res.render('register', {});
});

//Register new user
router.post('/administrator/register', function(req, res, next) {
  companyByName(req.body.companyName,function(company){
    if(company != null){
      console.log('company exists');
      Account.register(new Account({
        username: req.body.username,
        company: company._id
      }), req.body.password, function(err) {
        if (err) {
          console.log('error while user register!', err);
          return next(err);
        }
        console.log('user registered!');
        res.redirect('/administrator');
      });  
    } else {
      console.log('company doesnt exists');
      res.redirect('/administrator/register');
    }
  });

  
});

//Render login page
router.get('/administrator/login', function(req,res){
  if(req.user){
    res.redirect("/administrator");
  }else{
    res.render('login', {user: req.user});
  }
});

//Authenticate based on login request
router.post('/administrator/login', passport.authenticate('local'), function(req,res){
  res.redirect('/administrator');
});

//Logout
router.get('/administrator/logout', function(req, res) {
  req.logout();
  res.redirect('/administrator');
});

//Render administrator page
router.get('/administrator', function(req,res){
	if(req.user){
  	res.render('administrator', {user: req.user});
	}else{
  	res.redirect("/administrator/login");
	}
});

router.use('/administrator/static', express.static('views/static'));

module.exports = router;