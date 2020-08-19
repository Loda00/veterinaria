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

// app.post('/tipo', async (req, res) => {

//   const { tipo } = req.body
//   const con = await pool.connect()

//   try {
//     const reply = await con.query(`INSERT INTO tipoMascota (DESCRIPTION) values ('${tipo}');`)

//     res.json({
//       reply: reply.rows,
//     })
//   } catch (error) {
//     throw new Error(error)
//   } finally {
//     con.release()
//   }
// })

// app.put('/tipo', async (req, res) => {

//   const { tipo, idTipo } = req.body
//   const con = await pool.connect()

//   try {
//     const reply = await con.query(`UPDATE tipoMascota SET DESCRIPTION = ('${tipo}') WHERE ID_TIPO = ${idTipo};`)

//     res.json({
//       reply: reply.rows,
//     })
//   } catch (error) {
//     throw new Error(error)
//   } finally {
//     con.release()
//   }
// })

// app.delete('/tipo/:id', async (req, res) => {

//   const { id } = req.params
//   const con = await pool.connect()

//   try {
//     const reply = await con.query(`DELETE FROM tipoMascota WHERE ID_TIPO = ${id};`)

//     res.json({
//       reply: reply.rows,
//     })
//   } catch (error) {
//     throw new Error(error)
//   } finally {
//     con.release()
//   }
// })

module.exports = app