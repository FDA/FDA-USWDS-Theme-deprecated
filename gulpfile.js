// modules
const gulp = require('gulp');

// config
const config = require('./gulp/config');

// file paths
const SCSS_PATTERN = '**/*.scss';
const SCSS_PATH = `${config.paths.src.scss}/${SCSS_PATTERN}`;

// tasks
const uswds = require('./gulp/tasks/uswds');
const { sprites, images } = require('./gulp/tasks/assets');
const sass = require('./gulp/tasks/sass');

function watch(done) {
  console.log('Starting watch task');

  // style changes
  gulp.watch( SCSS_PATH, gulp.series(sass) );
  done();
}

module.exports = {
  watch,
  sprites,
  images,
  sass,
  uswds,
  default: gulp.series(
    (done) => {
      console.log('Starting default task');
      done();
    },
    uswds,
    gulp.parallel(sass, sprites, images)
  ),
};
