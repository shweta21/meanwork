'use strict';
//Module dependencies
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Home = mongoose.model('Home'),
	config = require('../../config/config'),
	util = require('util'),
	path =require('path'),
    fs   = require('fs'),
    sys = require('sys'),
    base64 = require('base64-image');

exports.list = function(req, res, next){
	Home.find(function(err, success) {
		console.log(success);
		res.json(success);
	});
};

exports.create = function(req, res, next){
	//create fn for image encoding & setting image path to uploads folder
	var fullUrl = req.protocol + '://' + req.get('host');
	var dateObj = new Date() ;
	var uniqueId = dateObj.getFullYear() + '' + dateObj.getMonth() + '' + dateObj.getDate() + '' + dateObj.getTime();
	var _filepath = path.resolve('public/uploads/');
	//console.log("BODY.data is---> " ,req.body.data);
	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};
		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
		return response;
	}

	var id = req.params.id ;
	Home.create({
	    name: req.body.name,
	    car:  req.body.car,	
	    size: req.body.size,
	    type: req.body.type
	},function(error ,success){
		console.log("SSS" , success);

		var imgName = uniqueId+'.jpeg';

		var _newPath = _filepath + '/' + imgName;
		var dbPath = fullUrl + '/uploads/' + imgName;
		var imageContent = decodeBase64Image(req.body.data);
		fs.writeFile(_newPath, imageContent.data, function(err) {
			if (err) {
				res.json(err);
			}else{
				success.file = dbPath ; 
				success.save();
				//Home.update({"_id":id},{file:dbPath});
				res.json(success);
			}
		});
			
	});
	//decodeBase64Image(req.body.data);
};

exports.delete = function(req, res) {
	//var id = req.id;
	console.log("controller delete called"  , req.params.id);
	var id=req.params.id ;
	if(typeof id =="undefined"){
		//error id not found 404 
	}
	Home.remove({"_id":id}).exec(function(err , succ) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log("SUCC",succ) ; 
			res.json(succ);
		}
	});
};

exports.update = function(req, res) {
	console.log("controller update called"  , req.params , req.body );
	var id = req.params.id ;
	Home.update({"_id":id},
		{
			name:req.body.name,
			car: req.body.car
		}
	).exec(function(err , succ) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(succ);
		}
	});
};