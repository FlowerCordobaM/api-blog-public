const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const BlogScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories", // Asegúrate de que este nombre coincida con el modelo de categorías.
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "tags", // Asegúrate de que este nombre coincida con el modelo de tags.
    required: true
  }],
  img: {
    type: String,
    required: true
  },
  desc_short: {
    type: String,
    required: true
  },
  desc_long: {
    type: String,
    required: true
  },
}, {
  versionKey: false,
  timestamps: true,
});

BlogScheme.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Blog", BlogScheme);
