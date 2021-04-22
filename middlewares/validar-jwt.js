
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async(req = request, res = response, next ) => {
    
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer usuario correspondiente al token pero se puede hacer con el payload para cargar sus datos
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            });
        }

        //verificar si el uid esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuario inactivo'
            });
        }

        req.usuario = usuario;

        next()
    } catch (error) {
        console.log('Token Expirado');
        console.log(error);
        console.log('Sistema funcionando');

        res.status(401).json({
            msg:'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}