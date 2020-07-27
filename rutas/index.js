const express = require('express')
const app = express()

app.use(
  require('./tipo'),
  require('./raza'),
  require('./estado'),
  require('./doctor'),
  require('./duenio'),
  require('./mascota')
)

module.exports = app
