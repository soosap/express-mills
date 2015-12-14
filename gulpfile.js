// http://stackoverflow.com/questions/33984558/gulp-error-cannot-find-module-jshint-src-cli
var gulp = require('gulp');
var jshint = require('gulp-jshint');    // Detect errors and potential problems in code
var jscs = require('gulp-jscs');        // Obey to a best practice coding style
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    /*
     |--------------------------------------------------------------------------
     | gulp-jscs/gulp-jshint
     |--------------------------------------------------------------------------
     |
     | This packages helps enforce coding standards.
     |
    */
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter())
    ;
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    /*
     |--------------------------------------------------------------------------
     | wiredep
     |--------------------------------------------------------------------------
     |
     | wiredep pulls in external dependencies. It will look at the "main"
     | key in the library's bower.json to determine which files to pull in.
     | This behaviour can be overwritten by specifying an overrides object
     | in our project's bower.json file.
     |
    */
    var options = {
        // -> therefore we have to tell wiredep where to find that information
        bowerJson: require('./bower.json'),
        // -> also it needs to know where all the bower dependencies live
        directory: './public/lib',
        // With this we say "../../public" needs to go away from the paths
        ignorePath: '../../public'
    };

    /*
     |--------------------------------------------------------------------------
     | gulp-inject
     |--------------------------------------------------------------------------
     |
     | Whereas wiredep handles injecting external third party libraries into
     | index.ejs we use gulp-inject to help us inject our project-specific
     | js and css files.
     |
     | Typically gulp.src() would read the content of all files that we provide
     | in the array. In this case, however, we are only interested in the
     | file names. That is why we pass the read: false option.
     |
     | injectOptions only assumes one property: ignorePath. Similarly to wiredep,
     | it will strip that particular part from the path it determines.
     |
    */
    var injectOptions = {
        ignorePath: '/public'
    };
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))                     // Inject third party dependencies
        .pipe(inject(injectSrc, injectOptions))     // Inject project dependencies
        .pipe(gulp.dest('./src/views'))
    ;
});

gulp.task('serve', ['style', 'inject'], function () {

    /*
     |--------------------------------------------------------------------------
     | gulp-nodemon
     |--------------------------------------------------------------------------
     |
     | Auto-restart our application every time watched files change.
     |
     */
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (evt) {
            console.log('Restarting...');
        })
    ;
});