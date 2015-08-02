'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function (uri, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	opts = opts || {};

	var connection = MongoClient.connect(uri, opts);

	return function expressMongoDb(req, res, next) {
		connection
			.then(function (db) {
				req[opts.property || 'db'] = db;
				next();
			})
			.catch(next);
	};
};
