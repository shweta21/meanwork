'use strict';
//Module dependencies
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Home = mongoose.model('Home'),
	config = require('../../config/config');

// Add new Object
exports.addObject = function(req, res) {
// 	var myObject = {
// 		name : $scope.myForm.name,	//req.body.name
// 	    car  : $scope.myForm.car
// 	};
	
// 	myObject.save(function(err) {
// 		if (err) { 
// 			console.log('mongo error ', err);
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		}
// //		res.json(myObject);
// 		else {
// 			res.status(400).send({
// 				message: 'not saved'
// 			});
// 		}
// 	});
};
exports.list = function(req, res){

};
exports.create = function(req, res){

};
exports.read = function(req, res){

};