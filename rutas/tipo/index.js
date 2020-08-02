const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/tipo', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query('SELECT * FROM tipoMascota;')
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

app.post('/tipo', async (req, res) => {

  const { tipo } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`INSERT INTO tipoMascota (DESCRIPTION) values ('${tipo}');`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.put('/tipo', async (req, res) => {

  const { tipo, idTipo } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`UPDATE tipoMascota SET DESCRIPTION = ('${tipo}') WHERE ID_TIPO = ${idTipo};`)

    res.json({
      reply: reply.rows,
    })
  } catch (error) {
    throw new Error(error)
  } finally {
    con.release()
  }
})

app.delete('/tipo', async (req, res) => {

  const { idTipo } = req.body
  const con = await pool.connect()

  try {
    const reply = await con.query(`DELETE FROM tipoMascota WHERE ID_TIPO = ${idTipo};`)

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