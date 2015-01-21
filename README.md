# express-mongo-db
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

Middleware that creates __only one__ connection, that initialized before first request is recieved and shares it for all next incoming requests.

## Usage

First - install middleware in project:

```npm i express-mongo-db mongodb --save```

Second - add middleware to express application:

```javascript
var app = require('express')();
app.use(require('express-mongo-db')(require('mongodb')));
```

Now you got `req.db` object of Mongodb database in every request handler.

## API

#### express-mongo-db(mongodb, [options])

Creates middleware with passed mongodb module instance (this is useful for promisification).

## Options

You can pass options to constructor of middleware function like this: `require('express-mongo-db')(options)` where `options` is an object with fields described below.

Also you can modify defaults value in `config` property of middleware contructor like this:

```javascript
var mongodb = require('express-mongo-db');
mongodb.config.readPreference = 'secondary';

var app = require('express')();
app.use(mongodb(require('mongodb')));

app.get('/', function(req, res) {
    req.db.find(/* ... */);
});

```

All options from [`mongodb-uri`](https://github.com/mongolab/mongodb-uri-node) plus:
All options from [`connect-once`](https://github.com/floatdrop/connect-once), such as `reconnectWait` and `heartbeat` function.
And `mongoClient` - object, that passed to [MongoClient.connect](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference).

## Events

To know what's up in your life, we provide event-emitter to listen to. For example - this is how you know, that reconnecton happening:

```javascript
var mongodb = require('express-mongo-db')(require('mongodb'), options);
mongodb.connection.on('reconnect', function(err) {
    console.log("Reconnecting to mongo (" + this.retries + " retries left). " + (err.stack ? err.stack : err));
});
```

Also you can subscribe on connection event:

```javascript
var mongodb = require('express-mongo-db')(require('mongodb'), options);
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
