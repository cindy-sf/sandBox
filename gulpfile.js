//Require
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');

//Compile les fichiers PUG en HTML
gulp.task('pug', function () {
    return gulp.src('src/static/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'));
});

//Compile les fichiers SASS en CSS
gulp.task('sass', function () {
    return gulp.src('src/static/sass/main.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Minify le Js
gulp.task('compress', function (cb) {
    pump([
          gulp.src('src/static/js/main.js'),
          uglify(),
          gulp.dest('dist/js')
      ],
      cb
    );
  });

//Browser-Sync / Nodemon
gulp.task('browser-sync', ['nodemon', 'pug', 'sass', 'compress'], function(){
    browserSync.init(null, {
        proxy: "http://localhost:2000",
        files: ["dist/**/*.*"],
        port: 7000,
    }),
    gulp.watch('src/static/sass/*.scss', ['sass']);
    gulp.watch('src/static/pug/*.pug', ['pug']);
    gulp.watch('src/static/js/*.js', ['compress']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

 gulp.task('default', ['browser-sync']);