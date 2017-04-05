import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import del from 'del';
import File from 'vinyl';
import fs from 'fs';
import globbing from 'gulp-css-globbing';
import gulp from 'gulp';
import gitrev from 'git-rev';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import php from 'gulp-connect-php';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import source from 'vinyl-source-stream';
import size from 'gulp-size';
import tsify from 'tsify';
import tslintify from 'tslintify';

import externals from './externals.js';

const reload = browserSync.reload;


gulp.task('clean', function () {
    del.sync(['public']);
});

gulp.task('version', function () {
    return gitrev.long(function (str) {
            return string_src('version.cache', str).pipe(gulp.dest('public'))
        });
});

gulp.task('content', function () {
    return gulp.src('app/**/*.{xml,json,yml,php}')
        .pipe(gulp.dest('public'))
        .pipe(size({
            title: "content"
        }));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
        .pipe(size({
            title: "fonts"
        }));
});

gulp.task('scripts', function () {
    const b = browserify({
            entries: 'app/scripts/main.ts',
            debug: true
        })
        .plugin(tslintify, { format: 'stylish' })
        .plugin(tsify, { noImplicitAny: true })
        .on('error', notify.onError(function (error) {
            // catches linting errors
            console.log(error);
            return 'Scripts Error: Please check your console.';
        }));

    return b.bundle()
        .on('error', notify.onError(function (error) {
            // catches syntax errors on bundling
            return 'Bundling Error: Please check your console.';
        }))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts:vendor', function () {
    return gulp.src(externals)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.{sass,scss}')
        .pipe(plumber())
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .on('error', error => console.error(error.message))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*.{jpg,jpeg,png,gif,svg,ico}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('public/images'))
        .pipe(size({
            title: "images"
        }));
});

gulp.task('php', function () {
    php.server({
        hostname: '0.0.0.0',
        base: 'public',
        port: 4040,
        open: false
    });
});

gulp.task('default', ['clean', 'version', 'styles', 'scripts', 'scripts:vendor', 'fonts', 'images', 'content', 'php'], function () {
    browserSync({
        port: 4200,
        proxy: {
            target: 'http://localhost:4040',
            reqHeaders: function (config) {
                return {
                    'accept-encoding': 'identity',
                    'agent': false
                }
            }
        },
        reloadDelay: 1000,
        notify: true,
        open: true,
        logLevel: 'silent'
    });

    gulp.watch('webapp/views/**/*', reload);
    gulp.watch('app/styles/**/*', ['styles']);
    gulp.watch('app/scripts/**/*', ['scripts']);
});

gulp.task('build', ['clean', 'version', 'styles', 'scripts', 'scripts:vendor', 'fonts', 'images', 'content']);

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true });
    src._read = function () {
        this.push(new File({ cwd: "", base: ".", path: filename, contents: new Buffer(string) }))
        this.push(null)
    };
    return src;
}
