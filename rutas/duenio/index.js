const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/duenio/:id', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query(`SELECT * FROM duenio WHERE ID_DUENIO = ${req.params.id};`)
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

app.post('/duenio', async (req, res) => {
  const { nombresApellidos, email, dni, telefono, direccion } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`
      INSERT INTO duenio (NOMBRES_APELLIDOS, EMAIL, DNI, TELEFONO, DIRECCION) VALUES
      ('${nombresApellidos}', '${email}', '${dni}', '${telefono}', '${direccion}');`)

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