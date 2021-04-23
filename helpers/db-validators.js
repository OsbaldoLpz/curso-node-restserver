const { Categoria, Usuario, Role } = require('../models');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El Rol: ${rol} no esta registrado en la bd`);
    }
}
const correoExiste = async(correo = '') => {
const existe = await Usuario.findOne({ correo });
    if (existe) {
        throw new Error(` El correo: ${ correo },  ya existe`);
    }
}

const existeUsuarioPorID = async(id) => {
    const existe = await Usuario.findById(id);
        if (!existe) {
            throw new Error(`El Id no existe ${ id }`);
        }
    }

// Apartado de Categorias
const categoriaPorIdExiste = async(id) => {
    const existe = await Categoria.findById(id);
    if (!existe) {
        throw new Error(`El id: ${id} no existe`)
    }
}
const categoriaVerificarNombre = async(nombre) => {
    nombre = nombre.toUpperCase();
    console.log()
    const existe = await Categoria.findOne({nombre});
    if (existe) {
        throw new Error(`El nombre: ${nombre}, ya existe`)
    }
}


module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioPorID,
    categoriaPorIdExiste,
    categoriaVerificarNombre
}