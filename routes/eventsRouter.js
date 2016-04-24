var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');
var dataController = require('../controllers/data');

//Retrieve student schedule
router.get('/:studentId', authController.isAuthenticated,
		function(req, res, next) {

			dataController.getStudentSchedule(req.params.studentId, function(err, data) {
				if (err) {
					console.log(err);
					/// / Do something with the error
			} else {
					res.json(data);
				}
			});

		});
		
//Retrieve events
router.get('/',
		function(req, res, next) {

			dataController.getEvents(function(err, data) {
				if (err) {
					console.log(err);
					/// / Do something with the error
			} else {
					res.json(data);
				}
			});

		});

module.exports = router;
