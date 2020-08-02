const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/estado', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query('SELECT * FROM estado;')
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

app.post('/estado', async (req, res) => {

  const { estado } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`INSERT INTO estado (DESCRIPTION) values ('${estado}');`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.put('/estado', async (req, res) => {

  const { estado, idEstado } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`UPDATE estado SET DESCRIPTION = ('${estado}') WHERE ID_ESTADO = ${idEstado};`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.delete('/estado', async (req, res) => {

  const { idEstado } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`DELETE FROM estado WHERE ID_ESTADO = ${idEstado};`)

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