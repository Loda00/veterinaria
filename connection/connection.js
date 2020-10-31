const { Pool } = require('pg')

const pool = new Pool({
  user: 'u374kyk1mhixy8ukjhdr',
  host: 'bpmzolmdt2u4jjzakhlr-postgresql.services.clever-cloud.com',
  database: 'bpmzolmdt2u4jjzakhlr',
  password: 'QOOAiZfmBevwMpGT5b35',
  port: 5432,
})

module.exports = {
  pool
}
