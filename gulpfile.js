var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	connect = require('gulp-connect'),
	modRewrite = require('connect-modrewrite'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	del = require('del');



gulp.task('jshint', function () {
	return gulp.src('./js/app.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('libs', function () {
	return gulp.src(['./bower_components/jquery/dist/jquery.min.js', './bower_components/lodash/dist/lodash.min.js', './bower_components/moment/min/moment.min.js', './bower_components/numeral/min/numeral.min.js', './bower_components/underscore/underscore.min.js'])
		.pipe(concat('alllib.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('min', function () {
	return gulp.src('./js/app.js')
		.pipe(minify('app.min.js'))
		.pipe(gulp.dest('./js/'));
});


gulp.task('scss', function () {
	return gulp.src('./scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))
});

gulp.task('watch', function () {
	gulp.watch(['./js/*.js'], ['jshint']);
	gulp.watch(['./scss/*.scss'], ['scss']);
});


gulp.task('server', function () {
	connect.server({
		root: '/Users/romanfedyshyn/Study/CursorEducation/JS/JS_homeworks/OOP',
		port: 9000,
		middlewar: function () {
			return [
				modRewrite([
						'^/api/(.*)$ http://localhost:8080/$1 [P]'
					])
				];
		}
	})
	gutil.log(gutil.colors.blue('HTTP server listening on port 9000'));
});