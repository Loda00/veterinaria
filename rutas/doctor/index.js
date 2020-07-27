const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/doctor', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query('SELECT * FROM doctor;')
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

module.exports = app