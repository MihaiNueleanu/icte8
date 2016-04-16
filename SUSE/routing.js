/*****************************************************************/
/** DEPENDENCIES                                                  /
/*****************************************************************/
var express	= require('express');
var router  = express.Router();

router.use(require('./routers/accounts.js'));

module.exports = router;