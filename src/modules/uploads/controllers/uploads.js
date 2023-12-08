const { response } = require("express");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { updateImage } = require("../../../shared/helpers/handleUpdateImagen");

// Función para crear un directorio si no existe
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const fileUpload = async (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  try {
    const typesValited = ["blogs", "users"];
    if (!typesValited.includes(type)) {
      return res.status(400).json({
        ok: false,
        msg: "Type not permitted",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No file was uploaded",
      });
    }

    const file = req.files.img;
    const shortName = file.name.split(".");
    const ExtensFile = shortName[shortName.length - 1].toLowerCase();

    const ExtensValidated = ["png", "jpg", "jpeg", "gif", "pdf", "doc"];
    if (!ExtensValidated.includes(ExtensFile)) {
      return res.status(400).json({
        ok: false,
        msg: "File extension not allowed",
      });
    }

    const nameFile = `${uuidv4()}.${ExtensFile}`;
    const dirPath = path.join(__dirname, "..", "storage", type);
    createDirIfNotExists(dirPath);
    const storagePath = path.join(dirPath, nameFile);

    file.mv(storagePath, function (err) {
      if (err) {
        console.log(err);
        return handleHttpError(res, "ERROR_MOVING_FILE");
      }
      // update db with file
      updateImage( type, id, nameFile );


      res.json({
        ok: true,
        msg: "File uploaded successfully",
        nameFile,
      });
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPLOAD_FILE");
  }
};
const getFile = async (req, res) => {
    const type = req.params.type;
    const img = req.params.img;

    // Verificar que tanto 'type' como 'img' estén definidos
    if (!type || !img) {
        return res.status(400).json({
            ok: false,
            msg: 'Type and image name are required'
        });
    }

    let pathImg = path.join(__dirname, '..', 'storage', type, img);

    // Si el archivo no existe, usar imagen por defecto
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, '..', 'uploads', 'no-img.jpg');
    }

    res.sendFile(pathImg);
}

module.exports = { fileUpload,getFile };
