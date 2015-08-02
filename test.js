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
		req.db.close(true, t.end);
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
		req.myDb.close(true, t.end);
	});
});

test('should return same connection for multiple requests', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:27017', {
		property: 'myDb'
	});
	var req = {};

	var _db;

	middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.myDb);
		_db = req.myDb;

		middleware(req, {}, function (err) {
			t.error(err);
			t.equal(_db, req.myDb);
			req.myDb.close(true, t.end);
		});
	});
});
