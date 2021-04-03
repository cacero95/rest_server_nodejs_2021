const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { dbConnection } = require('../dba/config_mongo');
/**
 * mysql database
 * const { connect_dba } = require('../dba/config');
 */
/**
 * Mongo database
 * 
 */
let connection = null;
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.users_path = "/api/users";
        // Middlewares
        /**
         * Mysql database
         * this.dba();
         */
        this.mongo_dba();
        this.middlewares();
        this.routes();
    }
    async mongo_dba() {
            await dbConnection();
        }
        /**
         * Mysql database
         * async dba() {
         *     await connect_dba();
         * }
         */
    middlewares() {
        this.app.use(cors());
        // Parse the data in this case in json
        this.app.use(express.json());
        this.app.use(express.static('reactnode/public'));
    }
    routes() {
        this.app.use(this.users_path, require('../routes/user_routes'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run on the port ${ this.port }`);
        })
    }
}
module.exports = {
    Server,
    connection
};