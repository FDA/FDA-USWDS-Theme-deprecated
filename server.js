const express = require('express')
const path = require('path')
const process = require('process');

const app = express()
const port = 3000
const liveReloadPort = 35729

// load static content first
app.use(express.static(path.join(__dirname, 'dist')))

// live reload script
app.use(require('connect-livereload')({
  port: liveReloadPort
}));

// static html files
app.use(express.static(path.join(__dirname, 'public')))

// start the server
const server = app.listen(port, () => {
  console.log(`App server listening on port ${port}`)
})

// close the server
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
