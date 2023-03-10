const gulp = require('gulp');
const liveReload = require('gulp-livereload');

function html(filePath) {
  console.log(`Starting HTML task: ${filePath}`)

  gulp
    .src(filePath)
    .pipe( liveReload() )
}

module.exports = html;
