const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const ContactScheme = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    subjet: {
      type: String,
    },
    message: {
      type: String,
    },
  
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ContactScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("contacts", ContactScheme);
