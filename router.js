var handlers = require('./handlers.js');

var routes = {
  '/'   : handlers.home,
  '/css/style.css' : handlers.file,
};

function router (req, res) {
    if (routes[req.url]) {
	     routes[req.url](req, res);
    }
}

module.exports = router;
