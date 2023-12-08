const mongoose = require("mongoose");
const { Schema } = mongoose;

const TagsScheme = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    img: {
      required: false,
      type: String,
    },

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

TagsScheme.method('toJSON', function() {
  const { __v, ...object } = this.toObject();

  return object;
})
module.exports = mongoose.model("tags", TagsScheme);
