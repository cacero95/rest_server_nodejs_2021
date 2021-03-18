const { Router } = require('express');
const { 
    users_get,
    users_post,
    users_delete,
    users_patch,
    users_put
} = require('../controllers/users_controllers');
const router = Router();

router.get(    '/', users_get );
router.post(   '/', users_post );
router.delete( '/', users_delete );
router.patch(  '/', users_patch );
router.put(    '/:id', users_put );

module.exports = router;