const { response } = require("express");
const { handleHttpError } = require("../../../shared/helpers/handleError");

const fileUpload = async (req, res = response) => {
  const type = req.params.type;
  const _id = req.params._id;

  const typePermited = ["user", "blog"];
  if (!typePermited.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "no tienes permisos ",
    });
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    // return res.status(400).json(
    //     {ok:false,msg:"No files were uploaded"}
    //     );
  }
  console.log(req.files)

  
  try {
    res.json({ ok: true, msg: "fileUpload data" });
  } catch (error) {
    console.log(error, "=====");
    handleHttpError(res, "ERROR_UPLOAD_FILE");
  }
};

module.exports = { fileUpload };
