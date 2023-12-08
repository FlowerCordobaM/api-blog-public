const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;  
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log('**** CONEXION CORRECTA ****');
      } else {
        console.log('**** ERROR DE CONEXION ****');
      }
    }
  );
};

module.exports = dbConnect;
