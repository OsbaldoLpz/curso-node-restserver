const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;
    res.json({
        msg: 'get api - Controlador'
    });
}

const usuariosPost = (req, res) => {

    const { nombre, edad} = req.body;

    res.json({
        msg: 'post api - Controlador',
        nombre, 
        edad
    });
}


const usuariosPut = (req, res) => {

    const { id } = req.params;
    res.json({
        msg: 'put api - Controlador',
        id
    });
}

const usuariosPatch = (req, res) => {

    res.json({
        msg: 'Patch api - Controlador'
    });
}

const usuariosDelete = (req, res) => {

    res.json({
        msg: 'delete api - Controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}