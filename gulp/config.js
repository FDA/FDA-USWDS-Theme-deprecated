const minimist = require('minimist');
const merge = require('lodash/merge');

// file paths
const DIST_PATH = 'dist';
const SRC_PATH = 'src'
const USWDS_PATH = 'node_modules/uswds/dist'

const paths = {
    dist: {
        img: `${DIST_PATH}/img`,
        fonts: `${DIST_PATH}/fonts`,
        js: `${DIST_PATH}/js`,
        css: `${DIST_PATH}/css`
    },
    src: {
        scss: `${SRC_PATH}/scss`,
        js: `${SRC_PATH}/js`,
        img: `${SRC_PATH}/img`
    },
    uswds: {
        js: `${USWDS_PATH}/js`,
        scss: `${USWDS_PATH}/scss/stylesheets`,
        img: `${USWDS_PATH}/img`,
        fonts: `${USWDS_PATH}/fonts`
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
            uglify: false,
        },
        css: {
            sourcemaps: true,
            minify: false
        }
    },
    production: {
        js: { 
            sourcemaps: false,
            uglify: true,
        },
        css: {
            sourcemaps: false,
            minify: true
        }
    }
}

// get arguments from command line
const knownOptions = {
  string: 'env',
  default: { env: 'development'}
};
const options = minimist(process.argv.slice(2), knownOptions);

module.exports.env = options.env;
module.exports.run = merge( {}, run.default, run[options.env] );
module.exports.paths = paths;
