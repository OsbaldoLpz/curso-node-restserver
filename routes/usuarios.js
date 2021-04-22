
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { 
    esRolValido, correoExiste,
    existeUsuarioPorID 
} = require('../helpers/db-validators');
const { 
    usuariosGet, usuariosPost, usuariosPut,
    usuariosPatch, usuariosDelete
 } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es debe ser de mas de 6 caracteres').isLength({ min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    // check('rol').custom(esRolValido),
    validarCampos
], usuariosDelete);




module.exports = router;