const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const rename = require('gulp-rename')
const config = require('../config');

// file paths
const pattern = 'styles.scss';
const NODE_MODULES = config.paths.uswds.scss;

function styles () {
  console.log('Compiling Sass');
  return gulp
    .src(`${config.paths.src.scss}/${pattern}`)
    .pipe(sourcemaps.init())
    .pipe(
      sass
        .sync({
          includePaths: NODE_MODULES,
        })
        .on('error', sass.logError)
    )
    .pipe(postcss(config))
    .pipe(gulpif(config.run.css.sourcemaps, sourcemaps.write()))
    .pipe( gulpif(config.run.css.minify, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(config.paths.dist.css));
};

module.exports = styles;
