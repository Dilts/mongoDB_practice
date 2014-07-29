var mongoose = require('mongoose')

// mongoose.model defines a constructor object that corresponds with a collection in your DB
// // first argument: name 
// second argument: schema (object literal)

var User = mongoose.model('User', {
	// key: arbitrary name for the property
	// value: Constructor that indicates the type
	// _id: mongoose.Schema.Types.ObjectId,
	email: String
})

module.exports = User;