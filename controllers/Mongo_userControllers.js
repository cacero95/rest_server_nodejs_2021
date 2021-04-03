const { response, request } = require('express');
const User = require('../models/Users');
const { makeHash } = require('../helpers/dbValidators');

const get_allUsers = async ( req = request, res = response ) => {
    const users = await User.find();
    res.json({
        users
    })
}

const get_user = async ( req = request, res = response ) => {
    req.body.id
    ? await User.findById( req.body.id ).then(( user ) => {
        res.json({ user });
    }).catch((err) => {
        res.json({ message: err.message })
    }) : await User.findOne({ email: req.body.email }).then(( user ) => {
        res.json({ user });
    }).catch(( err ) => {
        res.json({ message: err.message });
    });
}

const users_post = async ( req = request, res = response ) => {
    
    const body = req.body;
    const newUser = new User( body );
    newUser.password = makeHash( newUser.password );
    await newUser.save().then(() => {
        res.json({
            message: 'User created',
            newUser
        });
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
}
const users_put = async ( req, res = response ) => {
    const id = req.params.id;
    const { password, google, ...rest } = req.body;

    if ( password ) {
        rest.password = makeHash( password );
    }
    await User.findByIdAndUpdate( id, rest )
    .then((resp) => {
        password ? res.json({
            message: 'Data updated',
            rest
        }) : res.json({
            message: 'Process was succesfull',
            resp
        });
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })

}
const users_delete = (req, res = response) => {
    res.json({
        message: 'delete API - controller'
    })
}
const users_patch = (req, res = response) => {
    res.json({
        message: 'patch API - controller'
    })
}

module.exports = {
    get_user,
    get_allUsers,
    users_post,
    users_put,
    users_delete,
    users_patch
}