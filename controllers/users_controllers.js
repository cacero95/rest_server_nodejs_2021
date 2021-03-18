const { response, request } = require('express');
const users_get = ( req = request, res = response ) => {
    const query = req.query;
    res.json({
        message: 'get API - controller',
        query  
    })
}
const users_post = ( req, res = response ) => {
    const body = req.body;
    res.json({
        message: body
    })
}
const users_put = ( req, res = response ) => {
    const id = req.params.id;
    res.json({
        message: 'put API - controller',
        id
    })
}
const users_delete = ( req, res = response ) => {
    res.json({
        message: 'delete API - controller'
    })
}
const users_patch = ( req, res = response ) => {
    res.json({
        message: 'patch API - controller'
    })
}
module.exports = {
    users_get,
    users_post,
    users_put,
    users_delete,
    users_patch
}