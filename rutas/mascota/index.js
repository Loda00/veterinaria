const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/mascota', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query(`SELECT * FROM mascota;`)
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

app.get('/mascota/:id', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query(`SELECT * FROM mascota WHERE ID_MASCOTA = ${req.params.id};`)
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

app.post('/mascota', async (req, res) => {
  const { nombre, idDuenio, raza, tipo } = req.body

  const con = await pool.connect()
  const query = `INSERT INTO mascota (NOMBRE, ID_DUENIO, RAZA, TIPO) VALUES ('${nombre}', ${idDuenio}, ${raza}, ${tipo});`

  try {
    const reply = await con.query(query)
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