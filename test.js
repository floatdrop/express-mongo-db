'use strict';

var test = require('tap').test;
var expressMongoDb = require('./');

test('throws on invalid uri', function (t) {
	t.throws(function () {
		expressMongoDb();
	}, /Expected uri to be a string/);
	t.end();
});

test('middleware pass error on fail', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:31337');

	middleware({}, {}, function (err) {
		t.ok(err);

		middleware({}, {}, function (err) {
			t.ok(err);
			t.end();
		});
	});
});

test('middleware stores connection to mongodb', function (t) {
	var middleware = expressMongoDb('mongodb://localhost:27017');
	var req = {};

	middleware(req, {}, function (err) {
		t.error(err);
		t.ok(req.db);
		req.db.close(true, t.end);
	});
});

test('middleware stores connection in custom property', function (t) {
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

test('returns same connection for multiple requests', function (t) {
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
