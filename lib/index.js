var _ = require('lodash');

var defaults = _.partialRight(_.assign, function(a, b) {
    return typeof a == 'undefined' ? b : a;
});

var config = {
    host: 'localhost:27017',
    db: 'test',
    readPreference: 'secondaryPreferred',
    options: {
        db: {
            native_parser: false,
            numberOfRetries: 60,
            retryMiliSeconds: 1000
        },
        server: {
            auto_reconnect: true
        },
        replSet: {
            retries: 60,
            reconnectWait: 1000
        }
    }
};

module.exports = function (options) {
    var MongoClient = require('mongodb').MongoClient;

    var options = defaults({}, options, config);

    options.options.db.readPreference = options.readPreference;
    options.options.server.readPreference = options.readPreference;
    options.options.replSet.readPreference = options.readPreference;

    var connection = new (require('./connection'))();

    MongoClient.connect(
        "mongodb://" + options.host + "/" + options.db + "?",
        options.options,
        connection.store.bind(connection)
    );

    return function (req, res, next) {
        connection.when('called', function(err, db) {
            if (err) {
                return next(err);
            }
            req.db = db;
            next();
        });
    };
};

module.exports.config = config;