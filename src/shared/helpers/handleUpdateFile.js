const fs = require("fs");
const { blogModel } = require("../../modules/blog/models");
const { CategoryModel } = require("../../modules/category/models");
const { contactModel } = require("../../modules/contact/models");
const { storageModel } = require("../../modules/storage/models");
const { tagsModel } = require("../../modules/tags/models");
const { tracksModel } = require("../../modules/tracks/models");
const { userModel } = require("../../modules/user/models");

const deleteImagen = (path) => {
  if (fs.existsSync(path)) {
    // borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const UpdateImage = async (type, id, nameFile) => {
  let oldPath = "";

  switch (type) {
    case "blog":
      const blog = await blogModel.findById(id);
      if (!blog) {
        console.log("No es un blog por id");
        return false;
      }

      oldPath = `../../storage/blog${blog.img}`;
      deleteImagen(oldPath);

      blog.img = nameFile;
      await blogModel.save();
      return true;
      break;

    case "user":
      const user = await userModel.findById(id);
      if (!user) {
        console.log("No es un user por id");
        return false;
      }

      pathViejo = `../../storage/user${user.img}`;
      deleteImagen(oldPath);
      user.img = nameFile;
      await user.save();
      return true;

      break;
  }
};
module.exports ={
    deleteImagen,
    UpdateImage
}