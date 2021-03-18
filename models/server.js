const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.users_path = "/api/users";
        // Middlewares
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use( cors() );
        // Parse the data in this case in json
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }
    routes(){
        this.app.use( this.users_path, require('../routes/user _routes') );
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server run on the port ${ this.port }`);
        })
    }
}
module.exports = Server;