const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/historial/:id', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query(`SELECT c.*, d.NOMBRES_APELLIDOS as NOMBRE_DUENIO, d.email, d.dni, d.telefono,
    m.NOMBRE as NOMBRE_MASCOTA, m.date_creation as fechaRegistroMascota, doc.NOMBRES_APELLIDOS as NOMBRE_DOCTOR,
    e.DESCRIPTION as estado, rm.DESCRIPTION as raza, tm.DESCRIPTION as tipo
    FROM cita c INNER JOIN duenio d ON 
    c.id_duenio = d.id_duenio INNER JOIN mascota m ON
    c.id_mascota = m.id_mascota INNER JOIN doctor doc ON
    c.id_doctor = doc.id_doctor INNER JOIN estado e ON
    c.id_estado = e.id_estado INNER JOIN razamascota rm ON
    m.raza = rm.id_raza INNER JOIN tipomascota tm ON
    m.tipo = tm.id_tipo 
    WHERE fecha_salida IS NOT NULL AND id_cita = ${req.params.id};`)

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