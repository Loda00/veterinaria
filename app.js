const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use('/api/v1', require('./rutas'))

const { APP_PORT } = process.env

app.listen(8080, () => {
  console.log(`Server listening on port ${APP_PORT}`)
  console.log(`Server running => http://localhost:${APP_PORT}/api/v1/`)
})