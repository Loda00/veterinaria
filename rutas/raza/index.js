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
    const reply = await con.query(`INSERT INTO razaMascota (DESCRIPTION) values ('${raza}');`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.put('/raza', async (req, res) => {

  const { raza, idRaza } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`UPDATE razaMascota SET DESCRIPTION = ('${raza}') WHERE ID_RAZA = ${idRaza};`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.delete('/raza/:id', async (req, res) => {

  const { id } = req.params
  const con = await pool.connect()

  try {
    const reply = await con.query(`DELETE FROM razaMascota WHERE ID_RAZA = ${id};`)

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