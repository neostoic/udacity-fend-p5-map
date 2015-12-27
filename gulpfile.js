var gulp = require('gulp'),
  fs = require('vinyl-fs');
autoprefixer = require('gulp-autoprefixer'),
  runSequence = require('run-sequence'),
  minifyCss = require('gulp-minify-css'),
  minifyHTML = require('gulp-minify-html'),
  htmlReplace = require('gulp-html-replace'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  imgResize = require('gulp-image-resize'),
  rename = require('gulp-rename'),
  webFonts = require('gulp-google-webfonts'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  del = require('del');

  var paths = {
  restricted: ['!node_modules/**/*', '!bower_components/**/*'], //IMPORTANT: Use to block tasks from parsing this massive directory!
  serverConfigs: ['app/serverConfigs/*'],
  fonts: ['app/serverConfigs/fonts.list'],
  content: ['app/*.html'],
  contentViews: ['app/views/*.html'],
  styles: ['app/css/**/*.css'],
  cssFonts: ['app/css/'],
  cssWofFonts: ['app/css/*.woff'],
  stylesViews: ['app/views/css/**/*.css'],
  scripts: ['app/js/**/*.js'],
  scriptsViews: ['app/views/js/**/*.js'],
  img: ['app/img/**/*'],
  imgViews: ['app/views/images/**/*']
};
