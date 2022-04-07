const express = require('express')
const path = require('path')
const process = require('process');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
