const { request, response } = require("express");

const { Categoria } = require('../models');

const ObtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;

    //el motivo de mandar a llamar varias promesas en un arreglo
    // es por que las peticiones no dependen entre si  de modo
    // que podemos optimizar el tiempo de respuesta de esta manera
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoriaByID = async(req = request, res = response) => {
    const id = req.params.id;

    const categoria = await Categoria.findById(id)
                        .populate('usuario', 'nombre');

    res.json({
        categoria
    });
}

const CrearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    //generar la data a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    console.log(data);

    const categoria = new Categoria(data);

    //guardar db
    await categoria.save();

    res.status(201).json({
        msg:'Categoria Agregada',
        categoria
    });
}

const actualizarCategoria = async(req = request, res=response) => {
    
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;
    const categoriaActualizar = await Categoria.findByIdAndUpdate(id,{nombre,usuario});
    
    res.json({
        msg:'Categoria Actualizada',
        categoriaActualizar,
    });
}

const eliminarCategoria = async(req = request, res=response) => {
    
    const id = req.params.id;
    const usuario = req.usuario._id;
    const categoriaDB = await Categoria.findByIdAndUpdate(id,{estado:false,usuario});
    
    res.json({
        msg:'Categoria Eliminada',
        categoriaDB
    });
}


module.exports = {
    ObtenerCategorias,
    obtenerCategoriaByID,
    CrearCategoria,
    actualizarCategoria,
    eliminarCategoria
}