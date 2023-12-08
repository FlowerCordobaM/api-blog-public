const fs = require('fs');
const { userModel } = require('../../modules/user/models');
const { CategoryModel } = require('../../modules/category/models');
const { blogModel } = require('../../modules/blog/models');

const deleteImagen = (path) => {
    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const updateImage = async (type, id, nameFile) => {
    let pathOld = '';
    
    switch(type) {
        case 'users':
            const user = await userModel.findById(id);
            if (!user) {
                console.log('No es un usuario por id');
                return false;
            }

            pathOld = `./storage/users/${user.img}`;
            deleteImagen(pathOld);

            user.img = nameFile;
            await user.save();
            return true;

        case 'categories':
            const category = await CategoryModel.findById(id);
            if (!category) {
                console.log('No es una categoría por id');
                return false;
            }

            pathOld = `./storage/categories/${category.img}`;
            deleteImagen(pathOld);

            category.img = nameFile;
            await category.save();
            return true;

        case 'blogs':
            const blog = await blogModel.findById(id);
            if (!blog) {
                console.log('No es un blog por id');
                return false;
            }

            pathOld = `./storage/blogs/${blog.img}`;
            deleteImagen(pathOld);

            blog.img = nameFile;
            await blog.save();
            return true;

        default:
            console.log('Tipo no reconocido');
            return false;
    }
}

module.exports = { 
    updateImage
}
