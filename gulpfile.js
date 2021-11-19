// modules
const gulp = require('gulp');

// config
const config = require('./gulp/config');

// file paths
const SCSS_PATTERN = "**/*.scss";
const SCSS_PATH = config.paths.src.scss + SCSS_PATTERN;

// tasks
const uswds = require('./gulp/tasks/uswds');
const { sprites, images } = require('./gulp/tasks/assets');
const sass = require('./gulp/tasks/sass')

const watch = function(done) {
	console.log('Starting watch task');

	// style changes
	gulp.watch( SCSS_PATH, sass );
	done();
}

module.exports = {
	watch: watch,
	sprites: sprites,
	images: images,
	assets: gulp.parallel(sprites, images),
	sass: sass,
	uswds: uswds,
	default: gulp.series(
		function(done) {
			console.log('Starting default task');
			done();
		},
		uswds,
		gulp.parallel(sass, assets)
	)
}
