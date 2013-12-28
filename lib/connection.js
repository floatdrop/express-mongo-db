var _ = require('lodash');

function Connection(connect, options) {
    this.retries = options.retries;
    this.reconnectWait = options.reconnectWait;
    this.connect = connect;
    this.connect(this.store.bind(this));
};

Connection.prototype = Object.create(require('events').EventEmitter.prototype);

Connection.prototype.store = function store() {
    var args = Array.prototype.slice.call(arguments);
    if (args[0]) {
        this.retries --;
        if (this.retries > 0) {
            this.emit('reconnect', args[0]);
            setTimeout(this.connect.bind(null, this.store.bind(this)), this.reconnectWait);
            return;
        }
    }
    this.arguments = args;
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