# express-mongodb

Middleware that netowork-flaps and shit aware.

## Usage

First - install middleware in project:

```npm i express-mongodb --save```

Second - add middleware to express application:

```javascript
var app = require('express')();
app.use(require('express-mongodb')());
```

Now you got `req.db` object of Mongodb database in every request handler.

## Options

### host

### db

### readPreference

### options

(Yo dawg)

#### db

#### server

#### replSet