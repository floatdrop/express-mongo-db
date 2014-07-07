'use strict';

var _ = require('lodash'),
    connectOnce = require('connect-once');

var defaults = _.partialRight(_.assign, function (a, b) {
    return typeof a === 'undefined' ? b : a;
});

var config = {
    host: '127.0.0.1:27017',
    db: 'test',
    retries: 60,
    reconnectWait: 1000,
    mongodb: require('mongodb'),
    options: {}
};

module.exports = function (options) {
    options = defaults({}, options, config);

    var MongoClient = options.mongodb.MongoClient;
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

module.exports.config = config;
