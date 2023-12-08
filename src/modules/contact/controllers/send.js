const { matchedData } = require("express-validator");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { contactModel } = require("../models");

const createMessage = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await contactModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_Message");
  }
};
const updateMessage = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await contactModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_Message");
  }
};
const getItMessage = async (req, res) => {
  try {
    const data = await contactModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_Message");
  }
};
const getIMessageById = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await contactModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET:ID_Message");
  }
};
const deleteMessage =async (req,res)=>{
    try {
        req = matchedData(req);
        const {id}=req
        const data = await contactModel.delete({_id:id});
        res.send({ data });
      } catch (error) {
        handleHttpError(res, "ERROR_DELETE_Message");
      }
}

module.exports = {
  createMessage,
  updateMessage,
  getItMessage,
  getIMessageById,
  deleteMessage
};
