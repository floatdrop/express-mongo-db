/*global describe, before, beforeEach, after, afterEach, it */
var _ = require('lodash');
var assert = require('assert');
// var sinon = require('sinon');

var mongodb = require('../lib');
mongodb.config.logger = null;

describe('connection', function () {
    var req = {};

    it('should throw error on connection problems', function (done) {
        var middleware = mongodb({
            host: 'undefined',
            retries: 1
        });

        middleware(req, {}, function (err) {
            assert.ok(err !== undefined, 'Middelware not pass error');
            done();
        })
    });

    it('should connect to mongodb', function (done) {
        var middleware = mongodb();
        middleware(req, {}, function (err) {
            assert.ok(req.db, 'Connection to database is undefined');
            done(err);
        })
    });
});