// node is just a runtime environment that executes js code on the server
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var nav = [
    {text: 'Books', link: '/books'},
    {text: 'Authors', link: '/authors'}
];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

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

/*
 |--------------------------------------------------------------------------
 | Express routing
 |--------------------------------------------------------------------------
 |
 | We are building a library application.
 |
*/
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});