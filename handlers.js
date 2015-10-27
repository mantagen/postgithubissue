var handlers = module.exports = {
  router: router
};
var fs = require('fs');

var routes = {
    '/'   : handlers.home,
};

function router (req, res) {
    if (routes[req.url]) {
	routes[req.url](req, res);
    }
}

handlers.home = function (req, res) {
  var index = fs.readFileSync(__dirname + '/views/index.html');
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(index);
};
