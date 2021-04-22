const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req = request, res = response) => {

    const { correo, password } = req.body;
    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // verificar si el usuario esta activo 
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Inactivo'
            });
        }
        //verifica la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - PASSWORD'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }  
}
const googleSignin = async(req = request, res = response) => {

    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //Se necesita crear usuario
            
            const data = {
                 nombre,
                 correo,
                 password: 'N/A',
                 img,
                 google: true,
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en DB esta eliminado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg:'!Todo Ok! Google',
            usuario,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg:'Token de google no es valido'
        });
    }
}



module.exports = {
    login,
    googleSignin
}