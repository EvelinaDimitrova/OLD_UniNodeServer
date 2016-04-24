var express = require('express');
var router = express.Router();

var dataController = require('../controllers/data');


// Retrieve events
router.get('/', function(req, res, next) {

	var newsId = req.query.newsId;
	var chunkSize = req.query.chunkSize;
	console.log("newsId=" + newsId);
	console.log("chunkSize=" + chunkSize);

//	var news = [ {
//		'id' : 1,
//		'title' : 'Some Title 1',
//		'thumbnail' : 'image1.jpeg',
//		'date' : '2016-01-01',
//	}, {
//		'id' : 2,
//		'title' : 'Some Title 2 Some Title 2 Some Title 2 Some Title 2 Some Title 2',
//		'thumbnail' : 'image2.jpeg',
//		'date' : '2016-01-02',
//	} ];
//
//	res.json(news);
	dataController.getNews(newsId, chunkSize, function(err, data) {
		if (err) {
			console.log(err);
			// / / Do something with the error
		} else {
			res.json(data);
		}
	});

});


router.get('/:newsId', function(req, res, next) {

	var newsId = req.params.newsId;

//	var news = {
//		'id' : 1,
//		'title' : 'Some Title 1',
//		'image' : 'image1.jpeg',
//		'date' : '2016-01-01',
//		'text' : 'Volley offers the following classes for requesting images. These classes layer on top of each other to offer different levels of support for processing images			ImageRequest—a canned request for getting an image at a given URL and calling back with a decoded bitmap. It also provides convenience features like specifying a size to resize to. Its main benefit is that Volley\'s thread scheduling ensures that expensive image operations (decoding, resizing) automatically happen on a worker thread.			ImageLoader—a helper class that handles loading and caching images from remote URLs. ImageLoader is a an orchestrator for large numbers of ImageRequests, for example when putting multiple thumbnails in a ListView. ImageLoader provides an in-memory cache to sit in front of the normal Volley cache, which is important to prevent flickering. This makes it possible to achieve a cache hit without blocking or deferring off the main thread, which is impossible when using disk I/O. ImageLoader also does response coalescing, without which almost every response handler would set a bitmap on a view and cause a layout pass per image. Coalescing makes it possible to deliver multiple responses simultaneously, which improves performance.			NetworkImageView—builds on ImageLoader and effectively replaces ImageView for situations where your image is being fetched over the network via URL. NetworkImageView also manages canceling pending requests if the view is detached from the hierarchy.			Use ImageRequest			Here is an example of using ImageRequest. It retrieves the image specified by the URL and displays it in the app. Note that this snippet interacts with the RequestQueue through a singleton class (see Setting Up a RequestQueue for more discussion of this topic):'
//	};

//	res.json(news);
	
	dataController.getNewsDetail(newsId, function(err, data) {
		if (err) {
			console.log(err);
			// / / Do something with the error
		} else {
			res.json(data);
		}
	});

});

module.exports = router;
