var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber');
livereload = require('gulp-livereload');
imagemin = require('gulp-imagemin');
prefix = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: "src"
		},
		browser: 'firefox'
	});

	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
	gulp.watch('src/css/**/*.css', browserSync.reload);
});


//Scripts task
//uglifies
gulp.task('scripts',function(){
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});
// Styles task
gulp.task('styles',function(){
  return gulp.src('src/scss/*.scss')
  	.pipe(plumber())
  	.pipe(sass({
  		style:'expanded'
  	}))
	.pipe(prefix({
	    browsers: ['last 2 versions'],
	    cascade: false
	}))  	
    .pipe(gulp.dest('src/css'))
    .pipe(livereload());

});
//image task
gulp.task('image',function(){
  return gulp.src('media/img/*')
  	.pipe(imagemin())
  	.pipe(gulp.dest('build/img'))
    .pipe(livereload());

});


//watch save
gulp.task('watch',function(){

	var server = livereload();

	gulp.watch('src/js/*.js',['scripts']);
	gulp.watch('src/scss/*.scss',['styles']);
});

gulp.task('default',['scripts','watch','styles']);