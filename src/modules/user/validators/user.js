const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isLength({min:3, max:99}),
    check("age").exists().notEmpty().isNumeric(),
    check("password").exists().notEmpty().isLength({min:3, max:15}),
    check("email").exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorRegisterAdmin = [
  check("name").exists().notEmpty().isLength({min:3, max:99}),
  check("password").exists().notEmpty().isLength({min:3, max:15}),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
      return validateResults(req, res, next)
  }
];

const validatorLogin = [
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];
const validatorGetUser = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
  
  const validatorUpdateUser = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];
  

module.exports = { validatorRegister, validatorLogin,validatorGetUser,validatorUpdateUser,validatorRegisterAdmin};
