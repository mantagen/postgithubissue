var http = require('http');
var handlers = require('./handlers.js');
var port = process.env.PORT || 8000;
var serve = function(req, res) {
    handlers.router(req, res);
};

http.createServer(serve).listen(port);
console.log('server listening on port', port);
