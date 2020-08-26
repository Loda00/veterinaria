const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/historial', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query(`SELECT c.*, d.NOMBRES_APELLIDOS as NOMBRE_DUENIO, 
      m.NOMBRE as NOMBRE_MASCOTA, doc.NOMBRES_APELLIDOS as NOMBRE_DOCTOR,
      e.DESCRIPTION as estado 
      FROM cita c INNER JOIN duenio d ON 
      c.id_duenio = d.id_duenio INNER JOIN mascota m ON
      c.id_mascota = m.id_mascota INNER JOIN doctor doc ON
      c.id_doctor = doc.id_doctor INNER JOIN estado e ON
      c.id_estado = e.id_estado WHERE fecha_salida IS NOT NULL;`)

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