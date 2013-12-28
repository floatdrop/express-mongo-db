var _ = require('lodash');

function Connection() {
};

Connection.prototype = Object.create(require('events').EventEmitter.prototype);

Connection.prototype.store = function store() {
    this.arguments = Array.prototype.slice.call(arguments);
    this.emit.apply(this, ['called'].concat(this.arguments));
};

Connection.prototype.when = function when() {
    var args = Array.prototype.slice.call(arguments);
    if (this.arguments && args.length == 2 && args[0] === 'called' && _.isFunction(args[1])) {
        args[1](this.arguments);
    }
    this.once.apply(this, args);
};

module.exports = Connection;