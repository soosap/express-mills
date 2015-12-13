// node is just a runtime environment that executes js code on the server
var express = require('express');
var app = express();

var port = 5000;

app.use(express.static('public'));

app.get('/', function (req, res) {
		res.send('Hello World');
});

app.listen(port, function (err) {
		console.log('Running server on port ' + port);
});