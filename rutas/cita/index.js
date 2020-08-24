const express = require('express')
const { pool } = require('../../connection/connection')

const app = express()

app.get('/cita', async (req, res) => {

  const con = await pool.connect()

  try {

    const reply = await con.query('select * from cita WHERE fecha_salida IS NULL;')

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

  const { idCita, idDuenio, idDoctor, observaciones, idEstado, fechaSalida, horaSalida } = req.body

  const con = await pool.connect()

  try {

    await con.query(`UPDATE cita
                      SET ID_DUENIO = ${idDuenio},
                          ID_DOCTOR = ${idDoctor}, 
                          OBSERVACIONES = ${observaciones}, 
                          FECHA_SALIDA = ${fechaSalida || null}, 
                          HORA_SALIDA = ${horaSalida || null}, 
                          ID_ESTADO = ${idEstado},
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