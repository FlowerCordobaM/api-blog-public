const jwt = require("jsonwebtoken");
const { userModel } = require("../../modules/user/models");


const encode = async (_id, rol, email) => {
  const token = jwt.sign(
    { _id: _id, rol: rol, email: email },
    "tokenprocesssenv",
    { expiresIn: "31d" }
  );
  return token;
};

const decode = async (token) => {
  try {
    const { _id } = await jwt.verify(token, "tokenprocesssenv");
    const user = userModel.findOne({ _id: _id, state: 1 });
    if (user) {
      return user;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports  = {
    encode,
    decode
}