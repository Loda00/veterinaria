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

app.post('/doctor', async (req, res) => {

  const { nombresApellidos } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`INSERT INTO doctor (NOMBRES_APELLIDOS) values ('${nombresApellidos}');`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.put('/doctor', async (req, res) => {

  const { doctor, idDoctor } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`UPDATE doctor SET NOMBRES_APELLIDOS = ('${doctor}') WHERE ID_DOCTOR = ${idDoctor};`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.delete('/doctor/:id', async (req, res) => {

  const { id } = req.params
  const con = await pool.connect()

  try {
    const reply = await con.query(`DELETE FROM doctor WHERE ID_DOCTOR = ${id};`)

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