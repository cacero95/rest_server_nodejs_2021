const { response, request } = require('express');
const { getConnection } = require('../dba/config');
const { insert_query, select_query } = require('../models/queries');

const users_get = async(req = request, res = response) => {
    await getConnection().query(
        select_query(),
        async(err, results, fields) => {
            console.log(results);
            if (err) {
                res.json({
                    ok: false,
                    message: 'Intern error'
                })
            }
            res.json({
                out: results && results.length > 0 ? results.map((element) => {
                    return {...element }
                }) : []
            })
        }
    );
}
const users_post = async(req, res = response) => {
    const body = req.body;
    await getConnection().query(
        insert_query('Employee', body),
        (err, results, fields) => {
            if (err) {
                res.json({
                    ok: false,
                    message: 'Intern error'
                })
            }
        }
    )
    res.json({
        message: 'Element created'
    })
}
const users_put = (req, res = response) => {
    const id = req.params.id;
    res.json({
        message: 'put API - controller',
        id
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
    users_get,
    users_post,
    users_put,
    users_delete,
    users_patch
}