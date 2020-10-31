const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

const APP_PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use('/api/v1', require('./rutas'))


app.listen(8080, () => {
  console.log(`Server listening on port ${APP_PORT}`)
  console.log(`Server running => http://localhost:${APP_PORT}/api/v1/`)
})