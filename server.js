const express = require('express')
const path = require('path')
const process = require('process');

const app = express()
const port = 3000
const liveReloadPort = 35729

// load static content first
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

// load liveReload script only in development mode
app.configure('development', function() {
  // live reload script
  let excludeList = ['.woff', '.flv'];
  
  app.use(require('connect-livereload')({
    port: liveReloadPort,
    excludeList: excludeList
  }));
});

// start the server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

// close the server
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
