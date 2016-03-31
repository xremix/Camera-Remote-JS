var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	gulpIf = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	beautify = require('gulp-beautify'),
	babel = require('gulp-babel'),
	path = require('gulp-path'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	flatten = require('gulp-flatten'),
	gulpFilter = require('gulp-filter'),
	rename = require('gulp-rename'),
	mainBowerFiles = require('main-bower-files'),
	watch = require('gulp-watch'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

// ----- SETTINGS -----
var settings = {
  production:true,
  paths:{
	distribution: 'dist',
	web:{
		src:[
			'app/**/*.htm*',
			//'app/**/*.php'
		],
		dist:'dist'
	},
	scripts:{
		js:{
			src: 'app/scripts/**/*.js'
		},
		dist: 'dist/scripts',
		distFile: 'main.js'
	},
	style:{
		src: ['app/styles/**.scss'],
		distFile: 'main.css',
		dist: 'dist/styles/'
	},
	libraries:{
		src: 'bower.json'
	},
	icons:{
		srcPath:['bower_components/font-awesome/fonts/**.*'],
		dist:'dist/fonts'
	},
	images:{
		src:['app/images/*'],
		dist:'dist/images',
	}
  }
};

// ----- DEFAULT TASK -----
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['web', 'script', 'style', 'images', 'icons', 'libraries']);

// ----- WATCH TASK -----
gulp.task('watch', function(){
	gulp.watch(settings.paths.web.src, ['web']);
	gulp.watch(settings.paths.scripts.js.src, ['script']);
	
	gulp.watch(settings.paths.style.src, ['style']);
	gulp.watch(settings.paths.images.src, ['images']);
	gulp.watch(settings.paths.icons.srcPath, ['icons']);
	gulp.watch(settings.paths.libraries.src, ['libraries']);
});


// ----- WEB TASK -----
gulp.task('web', function(){
	gulp.src(settings.paths.web.src)
	.pipe(plumber())
	.pipe(gulpIf(settings.production, minifyHTML({})))
	.pipe(gulp.dest(settings.paths.web.dist));
});

// ----- SCRIPT TASK -----
gulp.task('script', function() {
	gulp.src(settings.paths.scripts.js.src)
		.pipe(plumber())
		//.pipe(babel({
		//	presets: ['es2015']
		//}))
		.pipe(beautify())
		//.pipe(concat(settings.paths.scripts.distFile))
		.pipe(gulp.dest(settings.paths.scripts.dist))
		.pipe(gulpIf(settings.production, uglify()))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(settings.paths.scripts.dist));
});



// ----- STYLE TASK -----
gulp.task('style', function() {
	gulp.src(settings.paths.style.src)
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	//.pipe(concat(settings.paths.style.distFile))
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
		}))
	.pipe(gulp.dest(settings.paths.style.dist))
	.pipe(gulpIf(settings.production, minifyCSS()))
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest(settings.paths.style.dist));
});


// ----- LIBRARIES TASK -----
gulp.task('libraries', function() {
		var jsFilter = gulpFilter('*.js',{restore:true});
		var cssFilter = gulpFilter(['*.css'],{restore:true});
		var sassFilter = gulpFilter(['*.scss'],{restore:true});
		var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'],{restore:true});

		return gulp.src(mainBowerFiles())
		.pipe(plumber())

		//---------- js -------
		.pipe(jsFilter)
		.pipe(gulp.dest(settings.paths.scripts.dist))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(settings.paths.scripts.dist))
		.pipe(jsFilter.restore)

		//---------- css -------
		.pipe(cssFilter)
		.pipe(gulp.dest(settings.paths.style.dist))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(settings.paths.style.dist))
		.pipe(cssFilter.restore)

		//---------- sass -------
		.pipe(sassFilter)
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(settings.paths.style.dist));
		lpipe(sassFilter.restore)
		//---------- font -------
		.pipe(fontFilter)
		.pipe(flatten())
		.pipe(gulp.dest(settings.paths.icons.dist));
});


gulp.task('icons', function() {
	return gulp.src(settings.paths.icons.srcPath)
				.pipe(gulp.dest(settings.paths.icons.dist));
});


gulp.task('images', () => {
    return gulp.src(settings.paths.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(settings.paths.images.dist));
});