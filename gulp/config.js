'use strict';

const minimist = require('minimist');
const _merge = require('lodash').merge;

// file paths
const DIST_PATH = 'dist/';
const SRC_PATH = 'src/'
const USWDS_PATH = 'node_modules/uswds/dist/'

const paths = {
    dist: {
        img: DIST_PATH + 'assets/img/',
        fonts: DIST_PATH + 'assets/fonts/',
        js: DIST_PATH,
        css: DIST_PATH
    },
    src: {
        scss: SRC_PATH + 'scss/',
        js: SRC_PATH + 'js/'
    },
    uswds: {
        js: USWDS_PATH + 'js/',
        scss: USWDS_PATH  + 'scss/',
        img: USWDS_PATH + 'img/',
        fonts: USWDS_PATH + 'fonts/'
    }
}

// toggles plugins for each environment
const run = {
    default: {
        js: {
            sourcemaps: false,
            uglify: false
        },
        css: {
            sourcemaps: false,
            minify: false
        }
    },
    development: {
        js: {
            sourcemaps: true,
            uglify: true,
        },
        css: {
            sourcemaps: true,
            minify: true
        }
    },
    production: {
        js: { 
            sourcemaps: false,
            uglify: true,
        },
        css: {
            sourcemaps: false,
            minify: false
        }
    }
}

// get arguments from command line
var knownOptions = {
  string: 'env',
  default: { env: 'development'}
};
var options = minimist(process.argv.slice(2), knownOptions);

module.exports.env = options.env;
module.exports.run = _merge( {}, run.default, run[options.env] );
module.exports.paths = paths;
