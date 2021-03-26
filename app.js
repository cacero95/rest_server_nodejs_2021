require('dotenv').config();
// has the logic to deploy the rest server
const { Server } = require('./models/server');
const server = new Server();
server.listen();