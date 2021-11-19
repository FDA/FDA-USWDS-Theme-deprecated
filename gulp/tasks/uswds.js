const gulp = require('gulp');
const config = require('../config');


// File paths
const pattern = "**/**";

/**
 * Copy USWDS theme setup
 */
 const theme = function() {
    return gulp.src( `${config.paths.uswds.scss}theme/${pattern}` )
        .pipe(gulp.dest( `${config.paths.src.scss}uswds/settings` ))
}

/**
 * Copy USWDS scripts
 */
 const scripts = function () {
	return gulp.src( config.paths.uswds.js + pattern )
		.pipe(gulp.dest( config.paths.dist.js ))
}

/**
 * Copy USWDS images
 */
const images = function () {
    return gulp.src( config.paths.uswds.img + pattern )
        .pipe(gulp.dest( config.paths.dist.img ))
};

/**
 * Copy USWDS fonts
 */
const fonts = function () {
	return gulp.src( config.paths.uswds.fonts + pattern )
        .pipe(gulp.dest( config.paths.dist.fonts ))
};

exports.default = gulp.parallel(theme, scripts, images, fonts)
