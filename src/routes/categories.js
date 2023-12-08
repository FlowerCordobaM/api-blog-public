const express = require("express");
const { getItcategories,createCategorie,getImagenCategorie,updatecategorie,deletecategorie } = require("../modules/category/controllers/category");
const router = express.Router();

// routes privates
router.get("/list", getItcategories);
router.post("/create", createCategorie );
router.put("/update",updatecategorie );
router.delete("/delete",deletecategorie);

module.exports = router;
