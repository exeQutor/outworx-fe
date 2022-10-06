const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');
const fs = require('fs');

const bladeFile = '../hq6/resources/overrideViews/coronis/appraisals/digital_presentation/29/index.blade.php';
const cssLinkTag = '<link rel="stylesheet" href="http://outworx-fe.test/css/app.min.css">';

gulp.task('styles', function() {
	return gulp.src(['scss/*.scss', '!scss/_*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'Firefox 14', 'opera 12.1', 'ios 6', 'android 4'))
		// .pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
	gulp.watch(['scss/**/*.scss'], gulp.series('styles'));
});

gulp.task('build', function() {
	return gulp.src(bladeFile)
		.pipe(replace(cssLinkTag, function() {
			var style = fs.readFileSync('./css/app.min.css', 'utf8');
      return '<style media="screen">\n' + style + '\n</style>';
		}))
		.pipe(gulp.dest('./dest/'));
});

gulp.task('default', gulp.series(['styles', 'watch']));
