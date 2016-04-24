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


/*****************************************************************
** Render registration page                                                       
*****************************************************************/
router.get('/administrator/register', function(req, res) {
  res.render('register', {});
});


/*****************************************************************
** Register new user 
*****************************************************************/
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


/*****************************************************************
** Render login page 
*****************************************************************/
router.get('/administrator/login', function(req,res){
  if(req.user){
    res.redirect("/administrator");
  }else{
    res.render('login', {user: req.user});
  }
});


/*****************************************************************
** Authenticate based on login request 
*****************************************************************/
router.post('/administrator/login', passport.authenticate('local'), function(req,res){
  res.redirect('/administrator');
});


/*****************************************************************
** Logout 
*****************************************************************/
router.get('/administrator/logout', function(req, res) {
  req.logout();
  res.redirect('/administrator');
});


/*****************************************************************
** Render administrator page 
*****************************************************************/
router.get('/administrator', function(req,res){
	if(req.user){
  	res.render('administrator', {user: req.user});
	}else{
  	res.redirect("/administrator/login");
	}
});


/*****************************************************************
** GET List of user accounts
*****************************************************************/
router.get('/accounts', function(req,res){
  if(req.user){

    var limit = parseInt(req.param('limit'));
    var skip = parseInt(req.param('skip'));
    var search = {};

    if(!req.user.superuser){
      console.log('not superuser');
      search = { company : req.user.company }; 
    } else {
      console.log('superuser');
    }

    Account
    .find(search)
    .populate('company','name')
    .exec(function(err, accounts){
      if(err) {res.writeHead(500, err.message)}
      res.send(accounts);
    });

  }else{
    res.status(500).send('Failed. Your request is not authentified');
  }
});

/*****************************************************************
** GET Single User Account by ID
*****************************************************************/
router.get('/account/:id', function(req,res){
  if(req.user){
    var id = req.params.id;
    var search = {};

    if(!req.user.superuser){
      console.log('not superuser');
      search = { company : req.user.company }; 
    } else {
      console.log('superuser');
    }

    Account
    .findOne({"_id":id})
    .populate('company','name')
    .exec(function(err, account){
      console.log(account);
      if (err) return handleError(err)
      res.status(200).send(account);
    });

  }else{
    res.status(500).send('Failed. Your request is not authentified');
  }
});

router.use('/administrator/static', express.static('views/static'));

module.exports = router;