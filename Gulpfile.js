var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var paths = {
	src: "src/Camera.js",
	dist: "dist/",
}

gulp.task('default', ['watch', 'build']);

gulp.task('build', function() {
  return gulp.src(paths.src)
    .pipe(plumber())
  	.pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(rename({
    	suffix: '.min'
	}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});

gulp.task('demo-web', function() {
  gulp.src('demos/web/styles/**.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
    }))
  //.pipe(gulp.dest('demos/web/styles/'))
  .pipe(minifyCSS())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest('demos/web/styles/'));
});


