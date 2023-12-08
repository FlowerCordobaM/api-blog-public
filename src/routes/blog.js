const express = require("express");
const {
  createBlog,
  deleteBlog,
  getIBlogById,
  updateBlog,
  getAllBlog,
} = require("../modules/blog/controllers/createBlog");
const { validatorCreateBlog } = require("../modules/blog/validators/blog");

const router = express.Router();

// routes publics
router.get("/all", getAllBlog );
router.get("/:id", getIBlogById);
// // routes private
router.post("/create",createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
module.exports = router;
