var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Applicant = require('./models/applicant.js')
// var indexController = require('./controllers/controller.js') 

mongoose.connect('mongodb://localhost/omega3');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
// app.get('/applicants', function(req, res){
// 	res.render('applicants')
// });

// // creates and applicant
// app.post('/applicant', function(req, res){
// 	console.log(req.body)
// 	// Here is where you need to get the data
// 	// from the post body and store it in the database
// 	res.send('Success');
// });

app.post('/success', function (req, res) {
	// creating a new user object from our mongoose model
	var applicant = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});	

	// save the user to the database
	// (instance method)
	applicant.save();
	// user.post('./views/listUsers')


	res.send('You have applied to Omega 3. Thank you for your interest!');
});


app.get('/applicants', function(req,res){

	// finda all users within the users collection
	// first argument of callback: error object or null
	// second argument of callback: results you want
	// (Static Method)
	Applicant.find({}, function(error, docs){

		if(error) {
			res.send(500, 'Error accessing collection')
		}
		else {
			// res.send(users)
			res.render('applicants', {
				applicant: docs
			});
		}
	});
});

app.get('/resumeBuilder/:id', function (req,res) {
	var resumeid = req.params.id
	Applicant.findOne({_id:resumeid}, function(err, docs){
		res.render('application', {
			prospect: docs
		})
	});
});


app.get('/deletedApplicant/:id', function (req,res){
	var applicantid = req.params.id
	Applicant.remove({_id: applicantid}, function(err,docs){
		res.redirect('/applicants')
	});
});



var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
