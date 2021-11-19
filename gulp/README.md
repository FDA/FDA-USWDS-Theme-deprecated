# Gulp Tasks

This folder contains configuration and tasks for the project's gulpfile. 

For the default production build run gulp with:

`$ gulp --env production`

For development run:

`$ gulp` or `gulp --env development`

Pass the `--env` argument to any gulp task for enviroment specific builds.

## Assets.js

The tasks defined in the `assets.js` file are used to copy font and image 
files in source to the `demo/assets/` or `dist/assets/` directories.

Run these tasks in gulp with:

`$ gulp images` or `gulp fonts`

## Scripts.js

The tasks defined in `scripts.js` are used to bundle JS files.

Run this task in gulp with:

`$ gulp scripts`

To just concatenate all JS files for the development environment 
run gulp with:

`$ gulp bundle`

## Styles.js

The tasks defined in `styles.js` generate style sheets.

Run this task in gulp with:

`$ gulp styles`

## Datatables.js

The tasks defined in `datatables.js` generate JS and CSS files for 
the DataTables library.

To just generate a JS bundle and style sheet for DataTables, run
gulp with:

`$ gulp datatables --env production`

## Labcoat.js

The `labcoat.js` file generates JS and CSS for Labcoat.

To just generate a JS bundle and style sheet for Labcoat, run
gulp with:

`$ gulp labcoat --env production`

## Select2.js

The `select2.js` file generates JS and CSS for the Select2 library.

To just generate a JS bundle and style sheet for Select2, run
gulp with:

`$ gulp select2 --env production`