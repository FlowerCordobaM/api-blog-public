// En tu archivo de configuración de Google Auth (por ejemplo, googleAuth.js)
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

// Asegúrate de tener GOOGLE_CLIENT_ID en tus variables de entorno
const client = new OAuth2Client('873904720812-v8tul300vdqqfth8jieunse10tev6jan.apps.googleusercontent.com');
// const data ='873904720812-v8tul300vdqqfth8jieunse10tev6jan.apps.googleusercontent.com'
// console.log(data,' aqui deberia ir el id')
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

module.exports = verify;
