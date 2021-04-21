const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Llamar rutas de toda la aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //lectura y parseo del body 
        //esto es necesario para poder leer y parsear los parametros que envien
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }

}


module.exports = Server;
