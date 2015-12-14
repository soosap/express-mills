// node is just a runtime environment that executes js code on the server
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

var nav = [
    {text: 'Books', link: '/books'},
    {text: 'Authors', link: '/authors'}
];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

/*
 |--------------------------------------------------------------------------
 | Express middleware
 |--------------------------------------------------------------------------
 |
 | We use express middleware bodyParser's json() to take all incoming
 | requests and parse that into json. urlencoded() is going to do the same
 | but for urlencoded bodies.
 |
*/
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

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
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});