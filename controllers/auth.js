// Load required packages
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var dataController = require('./data');

function verifyUserDB(userName, password, next) {
	// Get user from DB
	dataController.authenticateUser(userName, password, function(err, user) {
		if (err) {
			next(null, false, err);
		}
		if (!user) {
			next(null, false, {
				message : 'Invalid login!'
			});
		} else {
			next(null, user);
		}
	});
}

passport.use(new localStrategy({
	usernameField : "userid",
	passwordField : "password",
	session : false
}, verifyUserDB));

exports.isAuthenticated = passport.authenticate('local', {
	session : false
});
