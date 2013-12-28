# express-mongo-db

Middleware that netowork-flaps and shit aware.

## Usage

First - install middleware in project:

```npm i express-mongodb --save```

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
```

### Common options

 * `host` - server or replica string (default: `localhost`, but can be `server.one.com:123,server.two.com:456`)
 * `db` - name of database (default: `test`)
 * `readPreference` - readPreference of MongoDB (default: `secondaryPreferred`, more [values here](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference))
 * `options` - object, that passed to [MongoClient.connect](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference) with configured `readPreference` inside.