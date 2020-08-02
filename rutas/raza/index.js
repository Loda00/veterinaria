const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/raza', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query('SELECT * FROM razaMascota;')
    res.json({
      reply: reply.rows,
      rowCount: reply.rowCount,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.post('/raza', async (req, res) => {

  const { raza } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`INSERT INTO razaMascota (DESCRIPTION) values (${raza});`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

module.exports = app