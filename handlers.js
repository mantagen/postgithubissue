var handlers = module.exports = {};
var fs = require('fs');

handlers.home = function (req, res) {
  var index = fs.readFileSync(__dirname + '/views/index.html');
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(index);
};


handlers.file = function(req, res){
    var file = fs.readFileSync(__dirname + '/public' + req.url);
    var ext = (req.url).split('.')[1];
    res.writeHead(200, {'content-type' : 'text/' + ext});
    res.end(file);
};
