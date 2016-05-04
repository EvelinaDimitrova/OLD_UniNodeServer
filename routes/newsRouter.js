var express = require('express');
var router = express.Router();
var multer = require('multer');

var authController = require('../controllers/auth');
var dataController = require('../controllers/data');

var storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, 'D:\\Images');
	},
	filename : function(req, file, cb) {
		cb(null, file.originalname + '.jpg');
	}
});

var upload = multer({
	storage : storage
});

// Retrieve events
router.get('/', function(req, res, next) {

	var newsId = req.query.newsId;
	var chunkSize = req.query.chunkSize;
	// console.log("newsId=" + newsId);
	// console.log("chunkSize=" + chunkSize);

	dataController.getNews(newsId, chunkSize, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.json(data);
		}
	});

});

router.post('/add', authController.isAuthenticated, function(req, res, next) {

	var newsTitle = req.body.title;
	var newsText = req.body.text;
//	
//	console.log(newsTitle);
//	
//	var a = {'id' : 8};
//	res.json(a);
	
	dataController.addNews(newsTitle, newsText, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.json(data);
		}
	});

});

router.post('/add/image', upload.array('file'), function(req, res, next) {
//	console.log('/add/image');
//	console.log(req.files[0].filename);

	var newsId = req.query.newsId;
	var fileName = req.files[0].filename;
	
	console.log(newsId);
	console.log(fileName);	

	dataController.addNewsImage(newsId, fileName, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send();
		}
	});

});

router.get('/:newsId', function(req, res, next) {

	var newsId = req.params.newsId;

	dataController.getNewsDetail(newsId, function(err, data) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.json(data);
		}
	});

});

module.exports = router;