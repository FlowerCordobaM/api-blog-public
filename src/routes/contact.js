const express = require("express");
const { validatorSendMessage,validatorGetMessage } = require("../modules/contact/validators/contact");
const { createMessage,deleteMessage,getIMessageById,getItMessage } = require("../modules/contact/controllers/send");
const router = express.Router();

// routes public
router.post("/send",validatorSendMessage,createMessage );

// routes privates
router.get("/:id",[],getIMessageById );
router.get("/all",[], getItMessage);
router.delete("/:id",deleteMessage);

module.exports = router;
