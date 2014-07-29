var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wingzingly');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/signup', function (req, res) {
	res.send('You have signed up for Wingzingly!');
});

var server = app.listen(6881, function() {
	console.log('Express server listening on port ' + server.address().port);
});
