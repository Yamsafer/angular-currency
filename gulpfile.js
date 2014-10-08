var gulp = require('gulp'),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourceFiles = [
      'src/angularCurrency/angularCurrency.prefix',
      'src/angularCurrency/angularCurrency.js',
      'src/angularCurrency/directives/**/*.js',
      'src/angularCurrency/filters/**/*.js',
      'src/angularCurrency/services/**/*.js',
      'src/angularCurrency/angularCurrency.suffix'
    ];

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(concat('angular-currency.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-currency.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', ['test-src', 'build']);