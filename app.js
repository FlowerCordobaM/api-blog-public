require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morganBody = require("morgan-body");
const dbConnect = require("./src/config/mongo");
const loggerStream = require("./src/shared/helpers/handleLogger");
const fileUpload = require('express-fileupload');
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
const port = process.env.PORT || 3000;

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});


const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use( express.static('./src/public') );

app.use(fileUpload({
  createParentPath: true, // Esto asegurará que los directorios se creen si no existen
}));
app.use("/api/v1", require("./src/routes"));

app.listen(port, () => {
  dbConnect();
  console.log(`http://localhost:${port}`);
});
