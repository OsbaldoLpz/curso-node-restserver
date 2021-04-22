const Role = require('../models/roles');
const Usuario = require('../models/usuarios');

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


module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioPorID
}