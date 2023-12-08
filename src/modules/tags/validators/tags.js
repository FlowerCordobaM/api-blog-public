const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator");

const validatorCreaTags = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetTags = [
  check("_id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdaTags = [
  
  check("name").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorUpdaTags,validatorGetTags,validatorCreaTags };
