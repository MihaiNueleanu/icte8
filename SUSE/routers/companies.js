/*****************************************************************/
/** DEPENDENCIES                                                  /
/*****************************************************************/
var express               = require('express'),
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


/*****************************************************************
** GET Companies
*****************************************************************/
router.get('/companies', function(req, res) {
	if(req.user){
		
		var limit = parseInt(req.param('limit'));
		var skip = parseInt(req.param('skip'));
		var search = {};

		if(req.param('search') && req.param('search')!='' && req.param('search').length > 3){
			search = { $text : { $search : req.param('search') }}; 
		}
		console.log(search);

		Company.find(search, {}, function (err, results) {
			if(err) {
			  console.log(err);
			}    
			res.status(200).send(results);
		})
		.limit(limit)
		.skip(skip);
	} else {
		res.status(500).send('Failed. Your request is not authentified');
	}
});


/*****************************************************************
** GET Company > LADs
*****************************************************************/
//
router.get('/company/:id/lads/', function(req, res) {
  if (req.user){
    var id = req.params.id;
    Company.findOne({ '_id': id }, function (err, results) {
        if(err) { console.log(err); }    
        res.send(results); 
    });
  } else {
    res.status(500).send('Failed. Your request is not authentified');
  }
});


/*****************************************************************
** GET LAD
*****************************************************************/
router.get('/company/:companyId/lad/:ladId', function(req, res) {
  if (req.user){
    var companyId = req.params.companyId;
    var ladId = req.params.ladId;
    
    Company.findById(companyId, function (err, company) {
      var lad = company.lads.id(ladId);
      if(err) { console.log(err); }    
      res.send(lad);     
    });

  } else {
    res.status(500).send('Failed. Your request is not authentified');
  }
});


/*****************************************************************
** GET Company - Limited
*****************************************************************/
router.get('/company/:id', function(req, res) {
    if (req.user){
        var id = req.params.id;
        Company.findOne({ '_id': id },{name:1,description:1}, function (err, results) {
            if(err) { console.log(err); }    
            res.send(results); 
        });
    }
});


/*****************************************************************
** ADD Company
*****************************************************************/
router.post('/company/new', function(req, res) {
  if (req.user){
    var item = mongoose.model("Company",Company);
    var companyItem = new item;
    companyItem.name = req.body.name;
    companyItem.description = req.body.description;
    console.log(req.body);
    companyItem.save();

    console.log('*success: saved new note item:');
    console.log(companyItem);
    res.status(200).send('Success. New record was added to the database');  
  } else {
   res.status(500).send('Failed. Your request is not authentified');
  }
});


/*****************************************************************
** UPDATE LAD
*****************************************************************/
router.post('/company/:companyId/lad/:ladId', function(req, res) {
  if (req.user){
    var companyId = req.params.companyId;
    var ladId = req.params.ladId;
    var data = req.body;

    Company.findOneAndUpdate({ '_id': ladId }, data, function (err, results) {
      console.log('update resource');
      if(err) { console.log(err); }
      res.send('Success. Resource Updated'); 
    });
  } else {
    res.status(500).send('Failed. Your request is not authentified');
  }
});

/*****************************************************************
** PUSH LAD Data
*****************************************************************/
router.post('/company/:companyId/lad/:ladId/detector/:detectorId', function(req, res) {
  //if (req.user){
    var companyId   = req.params.companyId;
    var ladId       = req.params.ladId;
    var detectorId  = req.params.detectorId;
    var data        = req.body;

    Company.findById(companyId,function(err,company){
      company.lads.id(ladId).detector.id(detectorId).data.push({
        oil : data.oil,
        gas : data.gas,
        smoke : data.smoke,
        pressure : data.pressure
      });
      company.save(function (err) {
        if (err) return handleError(err)
        console.log('Success!');
        console.log(data);
        res.status(200).send('Success');
      });
    })

  //} else {
  //  res.status(500).send('Failed. Your request is not authentified');
  //}
});


/*****************************************************************
** UPDATE Company
*****************************************************************/
router.post('/company/:id', function(req, res) {
  if (req.user){
    var id = req.params.id;
    var data = req.body;
    delete data._id;

    Company.findOneAndUpdate({ '_id': id }, data, function (err, results) {
      console.log('update resource');
      if(err) { console.log(err); }
      res.send('Success. Resource Updated'); 
    });
  } else {
    res.status(500).send('Failed. Your request is not authentified');
  }
});

module.exports = router;