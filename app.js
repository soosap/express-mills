// node is just a runtime environment that executes js code on the server
var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

/*
 |--------------------------------------------------------------------------
 | Templating engines
 |--------------------------------------------------------------------------
 |
 | In order to set up template engines w/ node we need to specify the
 | views location and the view template engine in two separate express
 | variables. Then we switch from res.send() to res.render() in our app.get().
 |
 | Jade (compiled templating engine w/ very peculiar syntax)
 | Handlebars (for handlebars we need to explicitly set the app.engine()
 |     and declare which extension name to associate w/ it.
 | ejs
 |
*/
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {list: ['hello', 'there']});
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});