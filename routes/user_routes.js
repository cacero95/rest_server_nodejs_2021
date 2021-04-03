const { Router } = require('express');
const { check } = require('express-validator');
const { 
   users_put,
   users_delete,
   get_user,
   get_allUsers,
   users_patch,
   users_post
} = require('../controllers/Mongo_userControllers');
const { validateRole, existUserByID, validateRoleInRequest, validateAdminRole, validateSearch } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validations_fields');
/**
 * mysql user controllers
    * const {
    *     users_get,
    *     users_post,
    *     users_delete,
    *     users_patch,
    *     users_put
    * } = require('../controllers/users_controllers');
 */
//const { connection } = require('../models/server');
//console.log(connection);
const router = Router();
router.get(
   '/all/',
   [ 
      check( 'role' ).custom( validateAdminRole ),
      validateFields
   ],
   get_allUsers
);
router.get( '/', [ validateSearch ], get_user );
router.post(
   '/',
   [
      check( 'email', 'The email is not valid').isEmail(),
      check( 'name', 'the name cant be empty' ).notEmpty(),
      check( 'password', 'the password must have more than 6 letters' ).isLength({ min: 6 }),
      // check( 'role', 'the role is not valid' ).isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
      check( 'role' ).custom( validateRole ),
      validateFields
   ],
   users_post
);
router.delete('/', users_delete);
router.patch('/', users_patch);
router.put(
   '/:id',
   [
      check( 'id', 'No es un Id valido' ).isMongoId(),
      check( 'id' ).custom( existUserByID ),
      validateRoleInRequest,
      validateFields
   ],
   users_put
);

module.exports = router;