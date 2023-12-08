const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const CategoryScheme = new mongoose.Schema(
  {
    title: { type: String, maxlength: 250, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

CategoryScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("categories", CategoryScheme);
