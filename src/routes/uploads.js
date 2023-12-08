const express = require("express");
const file = require("express-fileupload");

const { fileUpload,getFile } = require("../modules/uploads/controllers/uploads");
const router = express.Router();


router.use(file())
// routes public
router.post("/:type/:id",fileUpload );
router.get("/:type/:img", getFile);
router.post('/upload', async (req, res) => {
    try {
      // req.file es el `image` enviado desde Angular
      const result = await cloudinary.uploader.upload(req.file.path);

      res.send({ url: result.secure_url });
    } catch (e) {
        console.log(e)
      res.status(500).send({ error: 'Error al cargar la imagen' });
    }
  });
  


module.exports = router;
