const { handleHttpError } = require("../../../shared/helpers/handleError");
const { CategoryModel } = require("../models");
const createCategorie = async (req, res) => {
    try {
        const newCategorie = new CategoryModel(req.body);
        const savedCategorie = await newCategorie.save();
        res.status(201).json(savedCategorie);
    } catch (error) {
        handleHttpError(res, error, "Error al crear categoría");
    }
};

const updatecategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCategorie = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCategorie) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(updatedCategorie);
    } catch (error) {
        handleHttpError(res, error, "Error al actualizar categoría");
    }
};

const getItcategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        handleHttpError(res, error, "Error al obtener categorías");
    }
};

const deletecategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategorie = await CategoryModel.findByIdAndDelete(id);
        if (!deletedCategorie) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(204).send();
    } catch (error) {
        handleHttpError(res, error, "Error al eliminar categoría");
    }
};

module.exports = {
    createCategorie,
    getItcategories,
    updatecategorie,
    deletecategorie
};
