# Gulp Tasks

This folder contains configuration and tasks for the project's gulpfile. 

If not installed, install the *gulp* command line utility and this project's dependencies:

```
$ npm install --global gulp-cli
$ npm install
```

For the default production build run gulp with:

```sh
$ gulp --env production
```

For development run:

```sh
$ gulp
```

Pass the `--env` argument to any gulp task for enviroment specific builds.

## Running Express Server

Gulp's *start* task uses Node's `AbortController` class to signal cancelation of the underlying *express* process. Run *gulp* with the `--experimental-abortcontroller` flag to enable this feature:

```sh
$ NODE_OPTIONS='--experimental-abortcontroller' gulp start
```
