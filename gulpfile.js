const gulp = require('gulp');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync');
const gls = require('gulp-live-server');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const include = require("gulp-include");



gulp.task('serve', () => {
    var server = gls.static('dist', 3030);
    server.start();
})

gulp.task('index', () => {
    return gulp.src('./public/view/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./publicProcess/view'))
})

gulp.task('style', () => {
    return gulp.src('./public/assets/css/*.styl')
        .pipe(stylus())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./publicProcess/assets/css'))
})

gulp.task('js', () => {
    return gulp.src('./public/assets/js/*.js')
        .pipe(include())

        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(browserSync.stream())
        // .pipe(uglify())
        .pipe(gulp.dest('./publicProcess/assets/js'))
})

gulp.task('serve', ['index', 'style', 'js'], function () {

    browserSync.init({
        server: {
            baseDir: "./",
            proxy: "127.0.0.1:8080"
        },
        open: false
    });

    gulp.watch('./public/view/*.pug', ['index']).on('change', browserSync.reload);
    gulp.watch('./public/assets/css/*.styl', ['style']).on('change', browserSync.reload);
    gulp.watch('./public/assets/js/*.js', ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['serve'], function () { })


