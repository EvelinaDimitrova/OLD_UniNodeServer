var express = require('express');
var authController = require('../controllers/auth');

var router = express.Router();

/* authenticate */
router.get('/signIn', authController.isAuthenticated, function(req, res, next) {
	res.status(200).send('Signed in');
});

module.exports = router;
