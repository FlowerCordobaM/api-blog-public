const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema(
  {
    name: {type: String,},
    email: {type: String,unique: true,},
    password: {type: String,},
    profesion: {type: String,required:false},
    google: {type: String,required:false},
    role:{type: String,maxlength:30,required:false},
    surname:{type: String,maxlength:250,required:false},
    avatar:{type: String,maxlength:250,required:false},
    state:{type: Number,default:1},
    img:{type:String,required:false},
    phone:{type: String,maxlength:20,required:false},
    birthday:{type: String,maxlength:20,required:false},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });

UserScheme.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  object.role = this.role;
  return object;
})
module.exports = mongoose.model("users", UserScheme);