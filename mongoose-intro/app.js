var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/users.js')
var indexController = require('./controllers/controller.js') 

mongoose.connect('mongodb://localhost/wingzingly');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/signup', function (req, res) {
	// creating a new user object from our mongoose model
	var user = new User({
		email: req.body.email
	});	

	// save the user to the database
	// (instance method)
	user.save();
	// user.post('./views/listUsers')


	res.send('You have signed up for Wingzingly!');
});

app.get('/viewusers', function(req,res){

	// finda all users within the users collection
	// first argument of callback: error object or null
	// second argument of callback: results you want
	// (Static Method)
	User.find({}, function(error, docs){

		if(error) {
			res.send(500, 'Error accessing collection')
		}
		else {
			// res.send(users)
			res.render('listUsers', {
				users: docs
			})
		}
	});
});

// app.get('/viewusers', function(req, res){
// 	user.render('/listUsers', function(error, users){
// 		email: user;
// 	})
// })



var server = app.listen(5692, function() {
	console.log('Express server listening on port ' + server.address().port);
});
