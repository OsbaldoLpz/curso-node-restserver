const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');


const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    // const usuarios = await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado: true});

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res) => {

   
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    

    //encriptar contra
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    

    //guardar en bd
    await usuario.save();

    res.json({
        msg: 'post api - Controlador',
        usuario
    });
}


const usuariosPut =  async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {
         //encriptar contra
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put api - Controlador',
        usuario
    });
}

const usuariosPatch = (req, res) => {

    res.json({
        msg: 'Patch api - Controlador'
    });
}

const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    //Fisicamente remover
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}