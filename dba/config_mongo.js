const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect (
            process.env.MONGOCONN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('Mongo DBA online');
    } catch ( error ) {
        console.log(error);
        throw new Error('Dba not initialized');
    }
}
module.exports = {
    dbConnection
}