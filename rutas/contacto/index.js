const express = require('express')
const { pool } = require('../../connection/connection')

const { mailer } = require('../../utils/mailer')

const app = express()

app.post('/contacto', async (req, res) => {

  const { email, nombres, asunto, descripcion } = req.body

  const con = await pool.connect()

  try {
    const resultMail = await mailer(email)

    if (resultMail === 500) {
      return res.status(500).json({
        reply: 'Email not exist !'
      })
    }

    await con.query(`INSERT INTO contacto (NOMBRES, EMAIL, ASUNTO, DESCRIPCION)
    VALUES ('${nombres}', '${email}', '${asunto}', '${descripcion}')`)

    res.json({
      reply: 'enviado'
    })

  } catch (e) {
    throw new Error(e)
  }finally {
    con.release()
  }
})

app.get('/contacto', async (req, res) => {

  const con = await pool.connect()

  try {
    const reply = await con.query('SELECT * FROM contacto;')
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