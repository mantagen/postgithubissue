var options = {
    host: 'api.github.com',
    path: '/repos/kat4/meow/issues',
    headers: {
     'Authorization': 'Basic ' + new Buffer(body.username + ':' + body.password).toString('base64')
   }
};

request = http.get(options, function(res){
    var body = "";
    res.on('data', function(data) {
        body += data;
    });
    res.on('end', function() {
        console.log(body);
    });
    res.on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
