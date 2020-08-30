const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/cita/:id', async (req, res) => {

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
    WHERE fecha_salida IS NULL AND id_cita = ${req.params.id};`)

    res.json({
      reply: reply.rows,
      rowCount: reply.rowCount,
    })

  } catch (e) {
    throw new Error(e)
  }finally {
    con.release()
  }
})

app.get('/cita', async (req, res) => {

  const con = await pool.connect()

  try {

    const reply = await con.query(`SELECT c.*, d.NOMBRES_APELLIDOS as NOMBRE_DUENIO, 
      m.NOMBRE as NOMBRE_MASCOTA, doc.NOMBRES_APELLIDOS as NOMBRE_DOCTOR,
      e.DESCRIPTION as estado 
      FROM cita c INNER JOIN duenio d ON 
      c.id_duenio = d.id_duenio INNER JOIN mascota m ON
      c.id_mascota = m.id_mascota INNER JOIN doctor doc ON
      c.id_doctor = doc.id_doctor INNER JOIN estado e ON
      c.id_estado = e.id_estado WHERE fecha_salida IS NULL;`)

    res.json({
      reply: reply.rows,
      rowCount: reply.rowCount,
    })

  } catch (e) {
    throw new Error(e)
  }finally {
    con.release()
  }
})

app.post('/cita', async (req, res) => {

  const { idDuenio, idMascota, idDoctor, observaciones, idEstado } = req.body

  const con = await pool.connect()

  try {

    await con.query(`INSERT INTO cita (ID_DUENIO, ID_MASCOTA, ID_DOCTOR, OBSERVACIONES, ID_ESTADO)
    VALUES (${idDuenio}, ${idMascota}, ${idDoctor}, '${observaciones}', ${idEstado})`)

    res.json({
      reply: 'enviado'
    })

  } catch (e) {
    throw new Error(e)
  }finally {
    con.release()
  }
})

app.put('/cita', async (req, res) => {

  const { idCita, idDoctor, observaciones, idEstado, fechaSalida, horaSalida } = req.body

  const con = await pool.connect()

  try {

    await con.query(`UPDATE cita
                      SET ID_DOCTOR = ${idDoctor}, 
                          OBSERVACIONES = '${observaciones}',
                          ${fechaSalida && horaSalida ? 
                            `FECHA_SALIDA = '${fechaSalida || ''}', 
                            HORA_SALIDA = '${horaSalida || ''}', ` : ''}
                            ID_ESTADO = ${idEstado}
                      WHERE ID_CITA = ${idCita};
                      `)

    res.json({
      reply: 'actualizado'
    })

  } catch (e) {
    throw new Error(e)
  }finally {
    con.release()
  }
})

module.exports = app