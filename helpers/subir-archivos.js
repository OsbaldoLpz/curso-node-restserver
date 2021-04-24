const path = require('path');
const  { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        console.log(extension);
    
        //valida extension
        // const extensionesValidas = ['png,jpg,jpeg,gif'];
        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension: ${extension} no es permitida - ${extensionesValidas} `);
        }
    
        const nombreTemp = uuidv4() + '.' + extension; 
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).json({err});
            }
            resolve(nombreTemp);
        });
    });

}


module.exports = {
    subirArchivo
}