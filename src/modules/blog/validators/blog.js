const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator");
const mongoose = require("mongoose");

const validatorCreateBlog = [
  check("title").exists().notEmpty(),
  check("desc_short").exists().notEmpty(),
  check("desc_long").exists().notEmpty(),
  check("categorie").exists().notEmpty().isMongoId(),
  check("tag").exists().notEmpty().isArray().custom((tags, { req }) => {
    tags.forEach(tag => {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
        throw new Error("Cada tag debe ser un MongoID válido");
      }
    });
    return true;
  }),
  check("img").exists().notEmpty(),
  // check("user").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next),
];

const validatorUpdateBlog = [
  // ... tus otros checks
  // No es necesario validar 'title', 'desc_short' y 'desc_long' de nuevo si no cambian
  check("categorie").exists().notEmpty().isMongoId(),
  check("tag").exists().notEmpty().isArray().custom((tags, { req }) => {
    tags.forEach(tag => {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
        throw new Error("Cada tag debe ser un MongoID válido");
      }
    });
    return true;
  }),
  // ... el resto de tu middleware de validación
];

module.exports = { validatorCreateBlog, validatorUpdateBlog };
