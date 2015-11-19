// Include gulp
var gulp = require('gulp');

// Include plugins
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');

// Static Server
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

// Concatenate JS Files
gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
          .pipe(concat('main.js'))
          .pipe(gulp.dest('build/js'))
          .pipe(rename({suffix: '.min'}))
          .pipe(uglify())
          .pipe(gulp.dest('build/js'));
});

// Sass Compile
gulp.task('style', function(){
  return gulp.src('sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css/'))
          .pipe(rename({suffix: '.min'}))
          .pipe(minifyCss({compatibility : ['ie8', '*']}))
          .pipe(gulp.dest('./css/'));
});

// Default Task
// gulp.task('default', ['scripts', 'style']);
gulp.task('default', function(){
  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('browser-sync', function(){
  browserSync.init({
    proxy: 'mylocal.dev'
  });
});