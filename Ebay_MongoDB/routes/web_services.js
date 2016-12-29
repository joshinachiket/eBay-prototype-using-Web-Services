var ejs = require("ejs");
var mysql = require('./mysql');
var bid = require('./bid');
var bcrypt = require('bcrypt-nodejs');
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/EbayDatabaseMongoDB";
var mq_client = require('../rpc/client');

var soap = require('soap');
var baseURL = "http://localhost:8080/EbayServices/services";

exports.profile = function(req, res) {
	var username = req.session.username;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo in: exports.profile at' + mongoURL);
		var coll = mongo.collection('profile');

		coll.findOne({
			username : username
		}, function(err, user) {
			if (user) {

				json_responses = {
					"users" : JSON.parse("[" + JSON.stringify(user) + "]")
				};
				console.log(json_responses);
				res.send(json_responses);

			}
		});

	});
};

exports.getAllProducts = function(req, res) {

	console.log("inside getAllProducts");
	var username = req.session.username;

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo at: ' + mongoURL);

		var coll = mongo.collection('products');
		var json_response;

		coll.find({
			username : {
				$ne : username
			}
		}).toArray(function(err, items) {

			json_response = {
				"products" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});
};

exports.getAllBids = function(req, res) {

	console.log("inside getAllBids");
	var username = req.session.username;

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo at: ' + mongoURL);

		var collection_bid = mongo.collection('bid');
		var json_response;

		collection_bid.find({
			username : {
				$ne : username
			}
		}).toArray(function(err, items) {

			json_response = {
				"products" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});
};

exports.submitAd = function(req, res) {

	var option = {
		ignoredNamespaces : true
	};

	var url = baseURL + "/ebay?wsdl";
	var args = {
		product_name : req.param('product_name'),
		product_desc : req.param('product_desc'),
		product_price : req.param('product_price'),
		tot_product : req.param('tot_product'),
		username : req.session.username
	};

	soap.createClient(url, option, function(err, client) {
		console.log("hie1");
		client.submitAd(args, function(err, result) {
			console.log("hie2");
			if (result.validateReturn === true) {
				console.log("hie3");
				res.send({
					statusCode : 200
				});
			} else {
				console.log("mai");
				res.send({
					statusCode : 401
				});
			}
		});
	});

};

exports.managesellitems = function(req, res) {

	console.log("inside managesellitems");
	var username = req.session.username;

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo at: ' + mongoURL);

		var collection_products = mongo.collection('products');
		var json_response;

		collection_products.find({
			username : {
				$eq : username
			}
		}).toArray(function(err, items) {

			json_response = {
				"ads" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});

};

exports.managebiditems = function(req, res) {

	console.log("inside managebiditems");
	var username = req.session.username;

	mongo.connect(mongoURL,
			function() {

				console.log('Connected to mongo inside managebiditems at: '
						+ mongoURL);

				var collection_bid = mongo.collection('bid');
				var json_response;

				collection_bid.find({
					username : {
						$eq : username
					}
				}).toArray(function(err, items) {

					json_response = {
						"ads" : items
					};
					console.log(json_response);
					res.send(json_response);

				});
			});

};

exports.boughthistory = function(req, res) {

	console.log("inside managebiditems");
	var username = req.session.username;

	mongo.connect(mongoURL,
			function() {

				console.log('Connected to mongo inside managebiditems at: '
						+ mongoURL);

				var collection_bought = mongo.collection('bought');
				var json_response;

				collection_bought.find({
					bought_product_owner : {
						$eq : username
					}
				}).toArray(function(err, items) {

					json_response = {
						"ads" : items
					};
					console.log(json_response);
					res.send(json_response);

				});
			});

};

exports.soldhistory = function(req, res) {

	console.log("inside soldhistory");
	var username = req.session.username;

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo inside soldhistory at: ' + mongoURL);

		var collection_bought = mongo.collection('bought');
		var json_response;

		collection_bought.find({
			bought_product_original_owner : {
				$eq : username
			}
		}).toArray(function(err, items) {

			json_response = {
				"ads" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});

};

exports.yourCart = function(req, res) {

	console.log("inside yourCart");
	var username = req.session.username;

	console.log("username: " + username);

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo at: ' + mongoURL);

		var collection_cart = mongo.collection('cart');
		var json_response;

		collection_cart.find({
			username : {
				$eq : username
			}
		}).toArray(function(err, items) {

			json_response = {
				"carts" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});
};

exports.removeCart = function(req, res) {

	console.log("inside removeCart");
	var username = req.session.username;
	var product_id = req.param("pid");

	mongo.connect(mongoURL, function() {

		console.log('Connected to mongo at: ' + mongoURL);

		var collection_cart = mongo.collection('cart');
		var collection_products = mongo.collection('products');

		var json_response;

		collection_cart.remove({
			_id : {
				$eq : ObjectId(product_id)
			}
		}), (function(err, items) {

			json_response = {
				"carts" : items
			};
			console.log(json_response);
			res.send(json_response);

		});
	});
};

exports.submitBid = function(req, res) {
	
	console.log("I AM INSIDE submitBid OF WEB_SERVICES.JS");

	var option = {
		ignoredNamespaces : true
	};

	var url = baseURL + "/submitBid?wsdl";
	var args = {
		username : req.session.username
	};

	soap.createClient(url, option, function(err, client) {
		console.log("hie1");
		client.submitBid(args, function(err, result) {
			console.log("hie2");
			if (result.validateReturn === true) {
				console.log("hie3");
				res.send({
					statusCode : 200
				});
			} else {
				console.log("mai");
				res.send({
					statusCode : 401
				});
			}
		});
	});
};

exports.getAllBoughtProducts = function(req, res) {

	console.log("I AM INSIDE getAllBoughtProducts OF WEB_SERVICES.JS");

	var option = {
		ignoredNamespaces : true
	};

	var url = baseURL + "/getAllBoughtProducts?wsdl";
	var args = {
		username : req.session.username
	};

	soap.createClient(url, option, function(err, client) {
		console.log("hie1");
		client.getAllBoughtProducts(args, function(err, result) {
			console.log("hie2");
			if (result.validateReturn === true) {
				console.log("hie3");
				res.send({
					statusCode : 200
				});
			} else {
				console.log("mai");
				res.send({
					statusCode : 401
				});
			}
		});
	});
};

exports.removeYourBidAD = function(req, res) {

	console.log("I AM INSIDE removeYourBidAD OF WEB_SERVICES.JS");

	var option = {
		ignoredNamespaces : true
	};

	var url = baseURL + "/removeYourBidAd?wsdl";
	var args = {
		product_id : req.param("pid"),
		username : req.session.username
	};

	soap.createClient(url, option, function(err, client) {
		console.log("hie1");
		client.removeYourBidAD(args, function(err, result) {
			console.log("hie2");
			if (result.validateReturn === true) {
				console.log("hie3");
				res.send({
					statusCode : 200
				});
			} else {
				console.log("mai");
				res.send({
					statusCode : 401
				});
			}
		});
	});
};