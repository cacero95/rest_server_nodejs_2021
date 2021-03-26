const mysql = require('mysql');
let connection = null;
const getConnection = () => {
    return connection;
}
const connect_dba = async() => {
    try {
        connection = mysql.createConnection({
            host: process.env.HOST,
            database: process.env.DBANAME,
            user: process.env.DBAUSER,
            password: process.env.PASS
        });
        connection.connect((err) => {
            if (err) {
                throw err;
            }
            getConnection();
            console.log('connected');
        })
    } catch (err) {
        throw new err
    }
}

module.exports = {
    connect_dba,
    getConnection
}