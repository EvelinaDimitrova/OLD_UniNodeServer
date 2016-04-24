var mysql = require("mysql");

var con = mysql.createConnection({
	host : "192.168.0.103",
	user : "root",
	password : "UniMobileApp123",
	database : "mydb"
});

function connect() {
	con.connect(function(err) {
		if (err) {
			console.log(err);
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
}

function getStudentSchedule(studentId, callback) {
	con.query('CALL GetStudentSchedule(\'' + studentId + '\')', function(err,
			rows) {
		if (err) {
			return callback(err, null);
		}

		console.log('GetStudentSchedule Data received from Db:\n');
		console.log(rows[0]);

		callback(null, rows[0]);
	});

}

function getEvents(callback) {
	con.query('CALL GetEvents()', function(err, rows) {
		if (err) {
			return callback(err, null);
		}

		console.log('GetEvents Data received from Db:\n');
		console.log(rows[0]);

		callback(null, rows[0]);
	});

}

function authenticateUser(userid, password, callback) {
	con.query('CALL AuthenticateUser(\'' + userid + '\',\'' + password + '\')',
			function(err, rows) {
				if (err) {
					return callback(err, null);
				}
				if (rows[0].length == 0) {
					return callback({
						message : 'No such user'
					}, null);
				}
				
				console.log('authenticateUser Data received from Db:\n');
				console.log(rows[0]);

				return callback(null, rows[0]);
			});
}

function getNews(newsId, chunkSize, callback) {
	con.query('CALL GetNews(' + newsId + ',' + chunkSize + ')',
			function(err, rows) {
				if (err) {
					return callback(err, null);
				}

				console.log('GetNews Data received from Db:\n');
				console.log(rows[0]);

				callback(null, rows[0]);
			});
}

function getNewsDetail(newsId, callback) {
	con.query('CALL GetNewsDetail(' + newsId + ')',
			function(err, rows) {
				if (err) {
					return callback(err, null);
				}

				console.log('GetNews Data received from Db:\n');
				console.log(rows[0][0]);

				callback(null, rows[0][0]);
			});
}

function getStudentPlan(userId, callback) {
	con.query('CALL GetStudentPlan(\'' + userId + '\')',
			function(err, rows) {
				if (err) {
					return callback(err, null);
				}

//				console.log('GetStudentPlan Data received from Db:\n');
//				console.log(rows[0][0].data);

				callback(null, JSON.parse(rows[0][0].data));
			});
}

// connect();

exports.getEvents = getEvents;
exports.getStudentSchedule = getStudentSchedule;
exports.authenticateUser = authenticateUser;
exports.getNews = getNews;
exports.getNewsDetail = getNewsDetail;
exports.getStudentPlan = getStudentPlan;
