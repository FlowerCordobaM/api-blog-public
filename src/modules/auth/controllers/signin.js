const verify = require("../../../shared/helpers/handleGoogleVery");
const { generateJWT } = require("../../../shared/helpers/handleJwt");
const { encode } = require("../../../shared/services/token");
const { userModel } = require("../../user/models");
const bcrypt= require("bcryptjs");
const cloudinary = require('cloudinary').v2;



cloudinary.config({ 
    cloud_name: 'dasrtj6i6', 
    api_key: '559299966197113', 
    api_secret: '83KJkSLbzuzJzf0CwMaSp3Oog7o' 
  });
  
  const handle_signig = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;
      let user = await userModel.findOne({ email: email });
  
      if (user) {
        return res.status(400).send({ message: "El usuario ya existe" });
      }
  
      // Cargar imagen a Cloudinary
      let result;
      if (avatar) {
        result = await cloudinary.uploader.upload(avatar);
      }
  
      const newUser = new userModel({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10), // Encriptar la contraseña
        avatar: result ? result.secure_url : null, // Guardar URL de la imagen
  
      });
  
      await newUser.save(); // Guardar el usuario en la base de datos
  
      // Crear y asignar un token (implementa la lógica para generar un token JWT)
      const token = await encode(newUser._id, newUser.role, newUser.email);
  
      res.status(201).json({
        message: "Usuario registrado con éxito",
        token: token,
        user: {
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        
        },
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ocurrió un problema durante el registro" });
    }
  };

// const handle_signig = async (req, res = response) => {
//   try {
//     const user = await userModel.findOne({email: req.body.email,state:1});
//     if(user){
//         //SI ESTA RGISTRADO EN EL SISTEMA
//         let compare = await bcrypt.compare(req.body.password,user.password);
//         if(compare){
//             let tokenT = await encode(user._id,user.rol,user.email);

//             const USER_FRONTED = {
//                 token:tokenT,
//                 user: {
//                     name: user.name,
//                     email: user.email,
//                     surname: user.surname,
//                     avatar: user.avatar,
//                 },
//             }

//             res.status(200).json({
//                 USER_FRONTED:USER_FRONTED,
//             })
//         }else{
//             res.status(500).send({
//                 message: "EL USUARIO NO EXISTE"
//             });
//         }
//     }else{
//         res.status(500).send({
//             message: "EL USUARIO NO EXISTE"
//         });
//     }
// } catch (error) {
//     res.status(500).send({
//         message: "OCURRIO UN PROBLEMA"
//     });
//     console.log(error);
// }
// };

const handle_google_signIn = async (req, res) => {
  try {
      const { token: googleToken } = req.body;
      if (!googleToken) {
          return res.status(400).send('Token no proporcionado');
      }

      // Verificar el token de Google y obtener datos del usuario
      const googleUser = await verify(googleToken);

      let user = await userModel.findOne({ email: googleUser.email });

      if (!user) {
          // Crear un nuevo usuario con los datos recibidos de Google
          user = new userModel({
              name: googleUser.name,        // Nombre del usuario proporcionado por Google
              email: googleUser.email,      // Email proporcionado por Google
              img: googleUser.picture,      // Imagen proporcionada por Google
              password: "@@@",
              google: true,
          });

          await user.save();
      } else {
          // Actualizar el usuario existente con los datos de Google
          user.google = true;
          user.name = googleUser.name;
          user.img = googleUser.picture;
          await user.save();
      }

      // Generar el JWT
      const jwtToken = await generateJWT(user._id); // Asegúrate de usar _id para el JWT

      res.json({
          ok: true,
          token: jwtToken,
          user: {
              uid: user._id,
              name: user.name,
              email: user.email,
              img: user.img,
              google: user.google,
              role: user.role,
          },
      });

  } catch (error) {
      console.error(error);
      res.status(500).send("Error al verificar el token de Google");
  }
};

const handle_signig_admin =async(req,res) => {
    try {
        const user = await userModel.findOne({email: req.body.email,state:1,rol: "admin"});
        if(user){
            //SI ESTA RGISTRADO EN EL SISTEMA
            let compare = await bcrypt.compare(req.body.password,user.password);
            if(compare){
                let tokenT = await encode(user._id,user.rol,user.email);

                const USER_FRONTED = {
                    token:tokenT,
                    user: {
                        name: user.name,
                        email: user.email,
                        surname: user.surname,
                        avatar: user.avatar,
                        rol: user.rol,
                    },
                }

                res.status(200).json({
                    USER_FRONTED:USER_FRONTED,
                })
            }else{
                res.status(500).send({
                    message: "EL USUARIO NO EXISTE"
                });
            }
        }else{
            res.status(500).send({
                message: "EL USUARIO NO EXISTE"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "OCURRIO UN PROBLEMA"
        });
        console.log(error);
    }
};




module.exports = {handle_signig,handle_google_signIn,handle_signig_admin };
