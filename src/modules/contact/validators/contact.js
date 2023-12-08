const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator");

const validatorSendMessage = [
  check("username").exists().notEmpty(),
  check("email").exists().notEmpty(),
  check("subjet").exists().notEmpty(),
  check("message").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetMessage= [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorGetMessage, validatorSendMessage };
