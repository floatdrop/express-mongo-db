# connect-once [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]
> Connect once and memorize connection for next usages

Middleware that netowork-flaps and shit aware.

## Usage

First - install middleware in project:

```npm i express-mongo-db --save```

Second - add middleware to express application:

```javascript
var app = require('express')();
app.use(require('express-mongo-db')());
```

Now you got `req.db` object of Mongodb database in every request handler.

## Options

You can pass options to constructor of middleware function like this: `require('express-mongo-db')(options)` where `options` is an object with fields described below.

Also you can modify defaults value in `config` property of middleware contructor like this:

```javascript
var mongodb = require('express-mongo-db');
mongodb.config.readPreference = 'secondary';

var app = require('express')();
app.use(mongodb());

app.get('/', function(req, res) {
    req.db.find(/* ... */);
});

```

 * `host` - server or replica string (default: `localhost`, but can be `server.one.com:123,server.two.com:456`)
 * `db` - name of database (default: `test`)
 * `readPreference` - readPreference of MongoDB (default: `secondaryPreferred`, more [values here](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference))
 * `retries` - number of retires of connection to cluster or within cluser (default: `60`)
 * `reconnectWait` - time between retries in milliseconds (default: `1000`)
 * `options` - object, that passed to [MongoClient.connect](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference) with configured `readPreference`, `retries`, `reconnectWait`, `numberOfRetries`, and `retryMiliSeconds` inside.

## Events

To know what's up in your life, we provide event-emitter to listen to. For example - this is how you know, that reconnecton happening:

```javascript
var mongodb = require('express-mongo-db')(options);
mongodb.connection.on('reconnect', function(err) {
    console.log("Reconnecting to mongo (" + this.retries + " retries left). " + (err.stack ? err.stack : err));
});
```

Also you can subscribe on connection event:

```javascript
var mongodb = require('express-mongo-db')(options);
mongodb.connection.when('available', function(err, db) {
    
});
```

`express-mongo-db` will start attempts to connect straight after require.

[npm-url]: https://npmjs.org/package/express-mongo-db
[npm-image]: https://badge.fury.io/js/express-mongo-db.png

[travis-url]: http://travis-ci.org/floatdrop/express-mongo-db
[travis-image]: https://travis-ci.org/floatdrop/express-mongo-db.png?branch=master

[coveralls-url]: https://coveralls.io/r/floatdrop/express-mongo-db
[coveralls-image]: https://coveralls.io/repos/floatdrop/express-mongo-db/badge.png

[depstat-url]: https://david-dm.org/floatdrop/express-mongo-db
[depstat-image]: https://david-dm.org/floatdrop/express-mongo-db.png?theme=shields.io
