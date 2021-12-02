const gulp = require('gulp');
const config = require('../config');

// File paths
const pattern = '**/**';

/**
 * Copy USWDS theme setup
 */
function theme () {
  return gulp
    .src(`${config.paths.uswds.scss}theme/${pattern}`)
    .pipe(gulp.dest(`${config.paths.src.scss}uswds/settings`));
};

/**
 * Copy USWDS scripts
 */
function scripts() {
  return gulp
    .src(config.paths.uswds.js + pattern)
    .pipe(gulp.dest(config.paths.dist.js));
};

/**
 * Copy USWDS images
 */
function images() {
  return gulp
    .src(config.paths.uswds.img + pattern)
    .pipe(gulp.dest(config.paths.dist.img));
};

/**
 * Copy USWDS fonts
 */
function fonts() {
  return gulp
    .src(config.paths.uswds.fonts + pattern)
    .pipe(gulp.dest(config.paths.dist.fonts));
};

module.exports = gulp.parallel(theme, scripts, images, fonts);
