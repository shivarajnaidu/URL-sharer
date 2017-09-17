'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const htmlReplace = require('gulp-html-replace');
const htmlmin = require('gulp-htmlmin');
// const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const rename = require('gulp-rename');

gulp.task('scripts', () => {
    return gulp.src('js/*.js')
        .pipe(concat('app.js'))
        .pipe(minify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', () => {
    return gulp.src('css/*.css')
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('build/css/'))
});

gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(htmlReplace({
            'styles': 'css/app.min.css',
            'scripts': 'js/app.min.js'
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('fonts', () => {
    return gulp.src('fonts/*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('icons', () => {
    return gulp.src('icons/*')
        .pipe(gulp.dest('build/icons'))
});

gulp.task('manifest', () => {
    return gulp.src('./manifest.json')
        .pipe(gulp.dest('build'))
});


gulp.task('copy', ['fonts', 'icons', 'manifest']);

gulp.task('default', ['scripts', 'styles', 'html', 'copy']);