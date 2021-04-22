
const { Router, request } = require('express');
const { check } = require('express-validator');

//aqui abajo tengo importado los middlewares de manera individual y posteriormente
//los importamos mediante un index por buenas practicas
// //middlewares
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {
    validarCampos, validarJWT,
    esAdminRole, tieneRole,
} = require('../middlewares');

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
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTA_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    // check('rol').custom(esRolValido),
    validarCampos
], usuariosDelete);




module.exports = router;