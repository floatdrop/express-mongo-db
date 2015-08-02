'use strict';

var test = require('tap').test;
var expressMongoDb = require('./');

test('should connect pass error on fail', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:31337');

	middleware({}, {}, function (err) {
		t.ok(err);
		t.end();
	});
});

test('should connect to mongodb', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:27017');
	var req = {};

	middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.db);
		t.end();
	});
});

test('should connect to mongodb with custom property', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:27017', {
		property: 'myDb'
	});
	var req = {};

	middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.myDb);
		t.end();
	});
});
