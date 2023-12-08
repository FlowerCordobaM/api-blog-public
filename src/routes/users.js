const express = require("express");
const { updateUser, list,deleteUser } = require("../modules/user/controllers/user");
const router = express.Router();


// routes priavte

router.put("/update",updateUser);
router.get("/list",list);
router.delete("/delete",deleteUser);


module.exports = router;
