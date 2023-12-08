const { handleHttpError } = require("../../../shared/helpers/handleError");
const { userModel } = require("../models");
const createUser = async (req, res) => {
  try {
      // Verificar si ya existe un usuario con el mismo email o nombre de usuario
      const existingUser = await userModel.findOne({
          $or: [{ email: req.body.email }, { name: req.body.name }]
      });

      if (existingUser) {
          return res.status(400).json({
              message: 'Ya existe un usuario con ese email o nombre de usuario'
          });
      }

      // Crear un nuevo usuario si no existe uno con el mismo email o nombre de usuario
      const user = new userModel({
          ...req.body,
          role: 'USER_ADMIN' // Asignando el rol 'admin' por defecto
      });
      await user.save();
      res.status(201).json(user);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_USER_ADMIN");
  }
};
const updateUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await userModel.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await userModel.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario de google no pueden cambiar su correo",
      });
    }

    const usuarioActualizado = await userModel.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_USER");
  }
};


const deleteUser = async (req, res) => {
  try {
    const User = await userModel.findByIdAndDelete({_id: req.query._id});
    res.status(200).json({
        message: "EL USUARIO SE ELIMINO CORRECTAMENTE",
    });
} catch (error) {
    res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
    });
    console.log(error);
}
};
const getUserById = async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
    console.log(error)
    handleHttpError(res, "ERROR_USER_ById_ADMIN");
  }
};


const list = async (req,res) => {
  try {
    var search = req.query.search;
    let Users = await userModel.find({
        $or:[
            {"name": new RegExp(search, "i")},
            {"surname": new RegExp(search, "i")},
            {"email": new RegExp(search, "i")},
        ]
    }).sort({'createdAt': -1});

    Users = Users.map((user) => {
        return user_list(user);
    })

    res.status(200).json({
        users: Users
    });
} catch (error) {
    res.status(500).send({
        message: "OCURRIO UN PROBLEMA"
    });
    console.log(error);
}

};
module.exports = {
  deleteUser,
  updateUser,
  getUserById,
  createUser,
  list
};
