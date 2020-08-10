const express = require('express')
const { pool } = require('../../connection/connection')
const { mailer } = require('../../utils/mailer')

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
    await con.query('BEGIN')
    const reply = await con.query(`
      INSERT INTO duenio (NOMBRES_APELLIDOS, EMAIL, DNI, TELEFONO, DIRECCION) VALUES
      ('${nombresApellidos}', '${email}', '${dni}', '${telefono}', '${direccion}');`)


    // if (reply.rows[0].fn_add_user === ID_NOT_CREATED) {
    //   await con.query('ROLLBACK')
    //   return res.status(500).json({
    //     success: false,
    //     description: 'E-mail already exist !'
    //   })
    // }


    // const sendEmail = await mailer(email)
    // console.log('sendEmail', sendEmail)
    // if (sendEmail === 500) {
    //   await con.query('ROLLBACK')
    //   return res.status(500).json({
    //     success: false,
    //     description: 'Email not exist !'
    //   })
    // }

    res.json({
      reply: reply.rows,
      rowCount: reply.rowCount,
    })

    await con.query('COMMIT')
  } catch (error) {
    await con.query('ROLLBACK')
    throw new Error(error)
  } finally {
    con.release()
  }
})

module.exports = app