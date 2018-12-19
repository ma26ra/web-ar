const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const uglify = require('gulp-uglify');

const webpackConfig = require("./webpack.config");

gulp.task('webpack', function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist"));
});

gulp.task('minify', function() {
    return gulp.src("dist/main.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/minify'));
});

gulp.task('default', ['webpack', 'minify']);
