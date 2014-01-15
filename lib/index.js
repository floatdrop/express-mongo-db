'use strict';

var _ = require('lodash');

var defaults = _.partialRight(_.assign, function (a, b) {
    return typeof a === 'undefined' ? b : a;
});

var config = {
    host: 'localhost:27017',
    db: 'test',
    readPreference: 'secondaryPreferred',
    retries: 60,
    reconnectWait: 1000,
    options: {
        db: {
            native_parser: false
        },
        server: {
            auto_reconnect: true
        },
        replSet: {
        }
    }
};

module.exports = function (options) {
    var MongoClient = require('mongodb').MongoClient;

    options = defaults({}, options, config);

    options.options.db.readPreference = options.options.db.readPreference || options.readPreference;
    options.options.db.numberOfRetries = options.options.db.numberOfRetries || options.retries;
    options.options.db.retryMiliSeconds = options.options.db.retryMiliSeconds || options.reconnectWait;
    options.options.server.readPreference = options.options.server.readPreference || options.readPreference;
    options.options.replSet.retries = options.options.replSet.retries || options.retries;
    options.options.replSet.reconnectWait = options.options.replSet.reconnectWait || options.reconnectWait;
    options.options.replSet.readPreference = options.options.replSet.readPreference || options.readPreference;

    var connect = MongoClient.connect.bind(MongoClient,
        'mongodb://' + options.host + '/' + options.db + '?',
        options.options
    );

    var connection = new (require('./connection'))(connect, options);

    this.connection = connection;

    return function (req, res, next) {
        connection.when('available', function (err, db) {
            if (err) {
                return next(err);
            }
            req.db = db;
            next();
        });
    };
};

module.exports.config = config;
