// modules
const gulp = require('gulp');

// config
const config = require('./gulp/config');

// file paths
const SCSS_PATTERN = '**/*.scss';
const SCSS_PATH = `${config.paths.src.scss}/${SCSS_PATTERN}`;
const PUBLIC_PATH = 'public/*';

// tasks
const uswds = require('./gulp/tasks/uswds');
const { sprites, images } = require('./gulp/tasks/assets');
const sass = require('./gulp/tasks/sass');
const startTask = require('./gulp/tasks/start');

function watchStyles(done) {

  // style changes
  gulp.watch( SCSS_PATH, gulp.series(sass) );
  done();
}

function watch() {

  // style changes
  gulp.watch( SCSS_PATH, gulp.series(
    function(done) {
      console.log('Starting styles watch task');
      done();
    },
    sass
  ));

  // html file changes
  gulp.watch( PUBLIC_PATH, { events: ['change'] }, function(done) {
    console.log('Starting HTML watch task');
    done();
  })
}

module.exports = {
  watch,
  sprites,
  images,
  sass,
  uswds,
  start: gulp.parallel(startTask, watch),
  default: gulp.series(
    (done) => {
      console.log('Starting default task');
      done();
    },
    uswds,
    gulp.parallel(sass, sprites, images)
  )
};
