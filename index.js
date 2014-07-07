'use strict';

var connectOnce = require('connect-once');

module.exports = function (mongodb, options) {
    options = options || {};
    options = {
        host: options.host || '127.0.0.1:27017',
        db: options.db || 'test',
        retries: options.retries || 60,
        reconnectWait: options.reconnectWait || 1000,
        options: options.options
    };

    var MongoClient = mongodb.MongoClient;
    var connection = new connectOnce(
        options,
        MongoClient.connect,
        'mongodb://' + options.host + '/' + options.db,
        options.options
    );

    var f = function (req, res, next) {
        connection.when('available', function (err, db) {
            if (err) {
                return next(err);
            }
            req.db = db;
            next();
        });
    };

    f.connection = connection;

    return f;
};
