
const bcrypt = require('bcryptjs');
const { userModel } = require("../../user/models");

const handle_signup = async (req, res = response) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10);
        const user = await userModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: "OCURRIO UN PROBLEMA"
        });
        console.log(error);
    }

};
const handle_signup_admin = async (req, res) => {
    try {
        const userV = await userModel.findOne({email: req.body.email});
        if (userV) {
            return res.status(500).send({
                message: "EL USUARIO YA EXISTE"
            });
        }
        req.body.rol = "admin";
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let user = await userModel.create(req.body);
        return res.status(200).json({
            user: user_list(user)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "OCURRIO UN PROBLEMA"
        });
    }
};


module.exports = { handle_signup,handle_signup_admin };
