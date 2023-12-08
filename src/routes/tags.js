const express = require("express");

const {createTags,getItTags,getITagsById,deleteTag,updateTag} = require("../modules/tags/controllers/tags");
const {validatorCreaTags,validatorUpdaTags} = require("../modules/tags/validators/tags");

const router = express.Router();

// routes public
router.get("/all",getItTags );
router.get("/:id",getITagsById );

// routes privates
// router.post("/create",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorCreaTags], createTags);
router.post("/create", createTags);
router.put("/:id", updateTag);
router.delete("/:id",deleteTag);

module.exports = router;
