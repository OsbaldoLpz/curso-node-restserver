const { request, response } = require("express");

const { Producto } = require('../models');

const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;

    //el motivo de mandar a llamar varias promesas en un arreglo
    // es por que las peticiones no dependen entre si  de modo
    // que podemos optimizar el tiempo de respuesta de esta manera
    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProductoPorID = async(req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findById(id)
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre');

    res.json({
        producto
    });
}

const crearProducto = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const { precio, descripcion, categoria} = req.body;

    // //generar la data a guardar
    // const data = {
    //     nombre, 
    //     usuario: req.usuario._id
    // }

    // console.log(data);

    // const categoria = new Categoria(data);

    // //guardar db
    // await categoria.save();

    res.status(201).json({
        msg:'Producto Agregada'
    });
}

const actualizarProducto = async(req = request, res=response) => {
    
    // const id = req.params.id;
    // const nombre = req.body.nombre.toUpperCase();
    // const usuario = req.usuario._id;
    // const categoriaActualizar = await Categoria.findByIdAndUpdate(id,{nombre,usuario});
    
    res.json({
        msg:'Producto Actualizada',
    });
}

const eliminarProducto = async(req = request, res=response) => {
    
    // const id = req.params.id;
    // const usuario = req.usuario._id;
    // const categoriaDB = await Categoria.findByIdAndUpdate(id,{estado:false,usuario});
    
    res.json({
        msg:'Producto Eliminada',
        // categoriaDB
    });
}


module.exports = {
    obtenerProductos,
    obtenerProductoPorID,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}