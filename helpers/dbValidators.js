const Roles = require("../models/Roles");
const bcrypt = require('bcryptjs');
const Users = require("../models/Users");

const makeHash = ( password ) => {
    return bcrypt.hashSync (
        password,
        bcrypt.genSaltSync() 
    );
}

const validateRole = async( role = '' ) => {
    if ( !await Roles.findOne({ role }) ){
       throw new Error(`The role ${ role } is not registered in the dba`);
    }
}
// if the role comes in the request this makes the validation
const validateRoleInRequest = async ( req, res, next ) => {
    req.body.role && !await Roles.findOne({ role: req.body.role })
    ? res.json({
        message: `The role ${ req.body.role } is not registered in the dba`
    }) : next();
}

const existUserByID = async( _id = '' ) => {
    if ( !await Users.findById({ _id }) ) {
        throw new Error( `The user with the _id ${ _id } was not found` );
    }
}

const validateAdminRole = async ( role = '' ) => {
    const findRole = await Roles.findOne({ role });
    if ( !findRole || findRole.role !== 'ADMIN_ROLE' ) {
        throw new  Error( `The role ${ role } has not access to the service` )
    }
}

const validateSearch = ( req, res, next ) => {
    !req.body.email && !req.body.id
    ? res.status({
        message: "The email or the are required for search the user"
    }) : next();
}

module.exports = {
    validateRole,
    validateSearch,
    validateAdminRole,
    makeHash,
    existUserByID,
    validateRoleInRequest,
}