'use strict';

// Module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//Home Schema
var HomeSchema = new Schema({
	name: {
		type: String,
		trim: true,
	},
	car: {
		type: String,
		trim: true,
	},
	file:{
		type: String,
		trim: true,
	},
	size:{
		type: String,
		trim: true,
	},
	type:{
		type: String,
		trim: true,
	}
});

mongoose.model('Home', HomeSchema);