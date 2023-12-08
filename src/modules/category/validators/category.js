const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator");

const validatorCreaCategory = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdaCategory = [
  check("name").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorUpdaCategory,validatorCreaCategory};
