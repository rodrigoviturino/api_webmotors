const gulp = require('gulp');
const rename = require('gulp-rename');
const minifyJS = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-uglifycss');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

sass.compiler = require('node-sass');

function base() {
    return gulp.src('src/template/*.html')
        .pipe(gulp.dest('public/'))
}

function images(){
    return gulp.src('./src/assets/img/*.svg')
        .pipe(gulp.dest('./public/assets/img/'))
}

function javascript(){
    return gulp.src('src/assets/**/*.js')
        .pipe(babel({presets:['@babel/env']}))
        .pipe(minifyJS())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('public/assets/'))
}

function compilaSass(){
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('public/assets/css/'))
    
}


gulp.task('default', gulp.parallel(base,javascript, compilaSass, images));