// modules
const gulp = require('gulp');

// config
const config = require('./gulp/config');

// file paths
const SCSS_PATTERN = "**/*.scss";
const SCSS_PATH = config.paths.src.scss + SCSS_PATTERN;

// tasks
const uswds = require('./gulp/tasks/uswds');
const { sprites } = require('./gulp/tasks/assets');
const labcoat = require('./gulp/tasks/labcoat')

const watch = function(done) {
	console.log('Starting watch task');

	// style changes
	gulp.watch( SCSS_PATH, labcoat );
	done();
}

module.exports = {
	watch: watch,
	sprites: sprites,
	labcoat: labcoat,
	uswds: uswds,
	default: gulp.series(
		function(done) {
			console.log('Starting default task');
			done();
		},
		uswds,
		labcoat
	)
}
