var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');
var dataController = require('../controllers/data');


// Retrieve events
router.get('/', function(req, res, next) {

	dataController.getElectivesCampaign(function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.json(data);
		}
	});

});

router.get('/courses', authController.isAuthenticated, function(req, res, next) {

	var userId = req.body.userid;
	
	dataController.getElectiveCourses(userId, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.json(data);
		}
	});

});

router.post('/courses/enroll', authController.isAuthenticated, function(req, res, next) {

	var userId = req.body.userid;
	var courseId = req.query.courseId;
	
	dataController.enrollCourse(userId,courseId, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send('Success');
		}
	});
});

router.post('/courses/cancel', authController.isAuthenticated, function(req, res, next) {

	var userId = req.body.userid;
	var courseId = req.query.courseId;
	
	dataController.cancelCourse(userId, courseId, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send('Success');
		}
	});
});

module.exports = router;
