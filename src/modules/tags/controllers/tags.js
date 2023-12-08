const { handleHttpError } = require("../../../shared/helpers/handleError");
const { tagsModel } = require("../models");

const createTags = async (req, res) => {
    try {
        const tag = new tagsModel(req.body);
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        handleHttpError(res, error, "Error al crear tag");
    }
};

const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagsModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }
        res.json(tag);
    } catch (error) {
        handleHttpError(res, error, "Error al actualizar tag");
    }
};

const getItTags = async (req, res) => {
    try {
        const tags = await tagsModel.find();
        res.json(tags);
    } catch (error) {
        handleHttpError(res, error, "Error al obtener tags");
    }
};

const getITagsById = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagsModel.findById(id);
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }
        res.json(tag);
    } catch (error) {
        handleHttpError(res, error, "Error al obtener tag por ID");
    }
};

const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await tagsModel.findByIdAndDelete(id);
        if (!tag) {
            return res.status(404).json({ message: "Tag no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        handleHttpError(res, error, "Error al eliminar tag");
    }
};

module.exports = {
    createTags,
    getItTags,
    getITagsById,
    updateTag,
    deleteTag
};
