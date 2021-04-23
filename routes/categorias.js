const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
const { categoriaPorIdExiste,categoriaVerificarNombre
 } = require('../helpers/db-validators');

//Controlador
const { ObtenerCategorias, obtenerCategoriaByID,
    CrearCategoria , actualizarCategoria,
    eliminarCategoria
 } = require('../controllers/categorias');

const router = Router();
 
    // {{url}}/api/categorias


//obtener todas las categorias publico
router.get('/', ObtenerCategorias);

//obtener una categoria por id publico
router.get('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(categoriaPorIdExiste),
    validarCampos
], obtenerCategoriaByID );

//Crear Categoria privado - cualquier rol con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(categoriaVerificarNombre),
    validarCampos
],CrearCategoria);

//Actualizar Categoria privado - cualquier rol con token valido
router.put('/:id', [
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(categoriaPorIdExiste),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(categoriaVerificarNombre),
    validarCampos
], actualizarCategoria);

//eliminar Categoria privado - Solo ADMIN con token valido
router.delete('/:id', [
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(categoriaPorIdExiste),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], eliminarCategoria);

module.exports = router;