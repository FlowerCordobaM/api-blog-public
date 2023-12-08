const { blogModel } = require("../models");
const { tagsModel } = require("../../tags/models");
const { CategoryModel } = require("../../category/models");
const { handleHttpError } = require("../../../shared/helpers/handleError");


const createBlog = async (req, res) => {
  try {
    const { categorie, tags, ...blogData } = req.body;

    // Verifica si la categoría existe
    let category = await CategoryModel.findOne({ _id: categorie });
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    let tagsDocs = [];
    if (Array.isArray(tags)) {
      tagsDocs = await Promise.all(tags.map(async (tagId) => {
        let tag = await tagsModel.findOne({ _id: tagId });
        if (!tag) {
          return res.status(404).json({ message: `Tag no encontrado: ${tagId}` });
        }
        return tag;
      }));
    }

    const newBlog = new blogModel({
      ...blogData,
      categorie: category._id,
      tags: tagsDocs.map(tag => tag._id)
    });

    await newBlog.save();

    // Uso correcto de populate con un array
    await newBlog.populate([
      { path: 'categorie', select: 'title' },
      { path: 'tags', select: 'name' }
    ]);

    res.status(201).json(newBlog);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};


const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
        return res.status(404).send();
    }
    res.send(blog);
} catch (error) {
    res.status(400).send(error);
}
  
};

const getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find()
      .populate('categorie', 'title')
      .populate('tags', 'name');
    
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error)
    handleHttpError(res, "Error al obtener los blogs",);
  }
};

const getIBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
        return res.status(404).send();
    }
    res.send(blog);
} catch (error) {
    res.status(500).send(error);
}
 
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    if (!blog) {
        return res.status(404).send();
    }
    res.send(blog);
} catch (error) {
    res.status(500).send(error);
}
  
};

module.exports = {
  deleteBlog,
  getIBlogById,
  updateBlog,
  createBlog,
  getAllBlog,
};

