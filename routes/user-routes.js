/*
    Route: /api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require('../controllers/user-controllers');
const { validateFields } = require('../middlewares/validateFields');
const {
  validateJWT,
  validateAdminRole,
} = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [validateJWT, validateAdminRole], getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields,
  ],
  postUser
);

router.put(
  '/:id',
  [
    [validateJWT, validateAdminRole],
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields,
  ],
  updateUser
);

router.delete('/:id', [validateJWT, validateAdminRole], deleteUser);

module.exports = router;
