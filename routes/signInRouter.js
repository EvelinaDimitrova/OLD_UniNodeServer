var express = require('express');
var authController = require('../controllers/auth');

var router = express.Router();

/* authenticate */
router.get('/', authController.isAuthenticated, function(req, res, next) {
	console.log(req.user);
	//res.status(200).send('Signed in');
	res.json(req.user);
});

module.exports = router;
