const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.users_path = "/api/users";
        // Middlewares
        //this.connect_dba();
        this.middlewares();
        this.routes();
    }
    //connect_dba() {
    //    const connection = mysql.createConnection({
    //        host: "localhost",
    //        database: "QUERY",
    //        user: "root",
    //        password: "Xboxplaywi95"
    //    });
    //    connection.connect((err) => {
    //        if (err) throw err;
    //        console.log("Connected!");
    //    })
    //}
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