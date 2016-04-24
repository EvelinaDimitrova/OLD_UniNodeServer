var express = require('express');
var fs = require('fs');

var router = express.Router();

var imagesRoot = 'D:\\Images';

// Retrieve image
router.get('/:imageName', function(req, res, next) {

	var imageName = req.params.imageName;
	var fullFilePath = imagesRoot + '\\' + imageName;

	fs.access(fullFilePath, fs.F_OK, function(err) {
		if (!err) {
			res.set('Content-Type', 'image/jpg');
			res.sendFile(imageName, {
				root : imagesRoot
			});
		} else {
			res.status(404).send();
		}
	});

});

router.get('/', function(req, res, next) {

	res.set('Content-Type', 'image/jpg');
	res.sendFile('test1.jpg', {
		root : 'D:\\Images'
	});

});

module.exports = router;
