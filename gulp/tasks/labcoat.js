const gulp = require('gulp');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const csso = require("postcss-csso");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const config = require('../config');

// file paths
const pattern = "**/**";
const NODE_MODULES = [
    config.paths.uswds.scss
]

const POST_CSS_PLUGINS = [
    // Autoprefix
    autoprefixer({
      cascade: false,
    }),
    // Minify
    config.run.css.minify ? csso({ forceMediaMerge: false }) : false
];

const styles = function () {
    console.log('Starting Labcoat styles task');
    return gulp.src( `${config.paths.src.scss}labcoat/${pattern}` )
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({
                includePaths: NODE_MODULES
            })
            .on('error', sass.logError)
        )
        .pipe(postcss(POST_CSS_PLUGINS))
        .pipe( gulpif( config.run.css.sourcemaps, sourcemaps.write() ))
        .pipe(gulp.dest( config.paths.dist.css ))
};

exports.default = styles
