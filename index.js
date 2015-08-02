'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var objectAssign = require('object-assign');

module.exports = function (uri, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	opts = objectAssign({
		property: 'db'
	}, opts);

	var connection = MongoClient.connect(uri, opts);

	return function (req, res, next) {
		connection
			.then(function (db) {
				req[opts.property] = db;
				next();
			})
			.catch(next);
	};
};
