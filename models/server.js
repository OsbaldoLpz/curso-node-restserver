const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        //una manera mas limpia para manejar las rutas
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }
        //rutas de manera individual
        // this.usersPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // this.categoriasPath = '/api/auth';

        //Conectar a Base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Llamar rutas de toda la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }

}


module.exports = Server;
