'use strict';

// Module dependencies
var home = require('../../app/controllers/home.server.controller');
module.exports = function(app) {
	// Routes
	//console.log("INcluded -----------------------");
	//app.route('/#!')
		//.get(home.list);
	app.route('/myForm/new/create')
		.get(home.list)
		.post(home.create);
		
	app.route('/myForm/new/:id')
		.post(home.update)
		.delete(home.delete);
};