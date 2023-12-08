const express = require("express");
const { validatorLogin,validatorRegister} = require("../modules/auth/validators/auth");

const { handle_signig,handle_google_signIn,handle_signig_admin} = require("../modules/auth/controllers/signin");
const { handle_signup,handle_signup_admin } = require("../modules/auth/controllers/signup");

const router = express.Router();

router.post("/signup",[validatorRegister],handle_signup);
router.post("/signup/admin",[validatorRegister],handle_signup_admin);

router.post("/signin",[validatorLogin],handle_signig);
router.post("/signin/admin",[validatorLogin],handle_signig_admin);
router.post("/signin/google",handle_google_signIn);
// router.post("/signout",[],handle_signig);


module.exports = router;
