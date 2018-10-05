const gulp = require('gulp');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const watch = require('gulp-watch');

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
        .pipe(gulp.dest('./publicProcess/assets/css'))
})

gulp.task('js', () => {
    return gulp.src('./public/assets/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./publicProcess/assets/js'))
})

gulp.task('watch', () => {
    gulp.watch('./public/view/*.pug', ['index']);
    gulp.watch('./public/assets/css/*.styl', ['style']);
    gulp.watch('./public/assets/js/*.js', ['js']);
})


