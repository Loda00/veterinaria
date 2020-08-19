const nodemailer = require('nodemailer')
const moment = require('moment')

const mailer = async (email) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD_GMAIL
    }
  })

  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: 'Petición de contacto',
    html: signup(email, email.split('@')[0])
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    console.log('error', error)
    return 500
  }

}

// https://myaccount.google.com/lesssecureapps?pli=1

// https://accounts.google.com/b/0/displayunlockcaptcha
// https://www.google.com/settings/security/lesssecureapps
// https://g.co/allowaccess

module.exports = {
  mailer
}


const signup = (email, nombre) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title> </head> <style> * {padding: 0px; margin: 0px;
    box-sizing: border-box; font-family: sans-serif; } .wrapper { position: relative;
    background-color: gray; height: 100px; width: 100%; }.wrapper-header { margin: 0 auto;
    width: 100px; height: 100px; padding-top: 50px; }.wrapper-icon {width: 100px;height: 100px;
    background-color: white; border-radius: 50%; }.icon { width: 100%; height: 100%;
    }.wrapper-body {text-align: center; padding: 70px 10% 60px; } .wrapper-body > h3 {
    margin: 20px 0px; }.wrapper-body > p {color: #afafaf; font-size: 15px; margin-bottom: 20px;
    }.wrapper-body > a {margin: 20px 0px; background-color: rgb(26, 115, 232); border: none;
    padding: 15px 100px; color: white; text-transform: uppercase; font-weight: bold;
    text-decoration: none; border-radius: 3px;}</style><body><div style="height: 600px;">
    <div class="wrapper"> <div class="wrapper-header"><div class="wrapper-icon">
    <img class="icon" src="https://img.icons8.com/plasticine/344/smiling.png" alt="happy" />
    </div></div><div class="wrapper-body"><h3>Correo enviado, ${nombre}</h3>
    <p>Nombre: ${nombre}</p> <p>Correo: ${email}</p> <p>Fecha: ${moment().format('DD-MM-YYYY')}</p>
    <p>Hora: ${moment().format('HH:mm:ss')}</p><a href="#">Validar correo</a>
    <div style="margin-top: 30px;">Location: PE</div> <div>Derechos reservados.</div>
    </div> </div></div></body></html>`
}


{/* <p style="margin-bottom: 30px;">Para culminar tu
    registro, valida tu correo eletrónico</p> */}