'use strict';

var connectOnce = require('connect-once');
var mongodbUri  = require('mongodb-uri');

module.exports = function (mongodb, options) {
    options = options || {};

    var uri = {
        hosts: options.hosts || [{ host: '127.0.0.1', port: 27017}],
        database: options.database || 'test',
        scheme: options.scheme,
        username: options.username,
        password: options.password,
        options: options.options
    };

    var MongoClient = mongodb.MongoClient;
    var connection = new connectOnce(
        {
            retries: options.retries || 60,
            reconnectWait: options.reconnectWait || 1000
        },
        MongoClient.connect,
        mongodbUri.format(uri),
        options.mongoClient
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
