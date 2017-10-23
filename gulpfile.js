var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('autoprefixer-stylus'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');


gulp.task('stylus', function() {
    gulp.src('./css/*.styl')
        .pipe(stylus({
            use: [autoprefixer()]
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('css_min', ['stylus'], function() {
    gulp.src('./css/default.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/'))
})

gulp.task('lint', function() {
    return gulp.src('./js/prosody.js')
        .pipe(jshint({
            'eqeqeq': true,
            'latedef': 'nofunc',
            'shadow': false,
            'undef': true
        }))
        .pipe(jshint.reporter('default'))
});

gulp.task('js_uglify', ['lint'], function() {
    return gulp.src('./js/prosody.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function() {
    gulp.watch('**/*.styl', ['stylus']);
});

gulp.task('build', ['stylus', 'css_min', 'js_uglify']);

gulp.task('default', ['build', 'watch']);