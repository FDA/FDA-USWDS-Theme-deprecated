const gulp = require('gulp');
const svgSprite = require("gulp-svg-sprite");
const config = require('../config');
const del = require("del");

// SVG sprite configuration
const SPRITE_CONFIG = {
    shape: {
      dimension: {
        // Set maximum dimensions
        maxWidth: 24,
        maxHeight: 24,
      },
      id: {
        separator: "-",
      },
      spacing: {
        // Add padding
        padding: 0,
      },
    },
    mode: {
      symbol: true, // Activate the «symbol» mode
    },
};

/**
 * Add SVGs to the usa-icons directory or move icons 
 * from usa-icons-unused into usa-icons and rebuild the sprite 
 */
const buildSprite = function() {
  console.log('Starting build sprites task');
    return gulp.src( `${config.paths.dist.img}/usa-icons/**/*.svg`, {
            allowEmpty: true,
        })
        .pipe( svgSprite(SPRITE_CONFIG) )
        .on("error", function (error) {
            console.error(error);
        })
        .pipe( gulp.dest( config.paths.dist.img ))
}

const renameSprite = function() {
    return gulp.src(`${config.paths.dist.img}/symbol/svg/sprite.symbol.svg`, {
        allowEmpty: true,
      })
      .pipe(rename(`${config.paths.dist.img}/sprite.svg`))
      .pipe(gulp.dest(`./`))
}

const cleanSprite = function() {
    del(`${config.paths.dist.img}/symbol`)
    .catch( (error) => {
        console.error(error)
    })
}

module.exports = {
    sprites: gulp.series(buildSprite, renameSprite, cleanSprite)
}
