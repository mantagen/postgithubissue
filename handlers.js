var handlers = module.exports = {};
var qs = require('querystring');
var fs = require('fs');
var https = require('https');

handlers.home = function(req, res) {
  var index = fs.readFileSync(__dirname + '/views/index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(index);
};


handlers.file = function(req, res) {
  var file = fs.readFileSync(__dirname + '/public' + req.url);
  var ext = (req.url).split('.')[1];
  res.writeHead(200, {
    'content-type': 'text/' + ext
  });
  res.end(file);
};


handlers.raiseissue = function(req, res) {
  console.log(req, req.url);
  parseBody(req, function(body) {
    body = qs.parse(body);
    console.log(body);
    postToGithub(body);
    res.end('done');
  });

};


function parseBody(object, callback) {
  var body = "";
  object.on('data', function(data) {
    body += data;
  });
  object.on('end', function() {
    callback(body);
  });
  object.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

function postToGithub(body) {
  var options = {
    host: 'api.github.com',
    path: '/repos/mantagen/postgithubissue/issues',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
      'Authorization': 'Basic ' + new Buffer(body.username + ':' + body.password).toString('base64')
    },
    method: 'POST'
  };
  body = {
    title: body.title,
    body: body.body
  };
  var reqToGithub = https.request(options, function(res) {
    parseBody(res, function(body) {
      console.log(body);
    });
  });
  reqToGithub.write(JSON.stringify(body));
  reqToGithub.end();
}
