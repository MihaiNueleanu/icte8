/*****************************************************************/
/** DEPENDENCIES                                                  /
/*****************************************************************/
var express	= require('express');
var router  = express.Router();

router.use(require('./routers/accounts.js'));
router.use(require('./routers/companies.js'));

module.exports = router;