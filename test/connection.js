/* global describe, it */
/* jshint expr:true */
'use strict';

var mongodb = require('..');
var should = require('should');

describe('connection', function () {
    it('should connect pass error on fail', function (done) {
        var middleware = mongodb(require('mongodb'), {
            hosts: [{hostname: 'undefined'}],
            retries: 1,
            reconnectTimeout: 1
        });

        middleware({}, {}, function (err) {
            should(err).is.ok;
            done();
        });
    });

    it('should connect to mongodb', function (done) {
        var middleware = mongodb(require('mongodb'));
        var req = {};
        middleware(req, {}, function (err) {
            should(req.db).is.ok;
            done(err);
        });
    });
});
