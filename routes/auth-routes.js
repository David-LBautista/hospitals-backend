/*
  AUTH
  Auth routes: /api
*/

const {Router} = require('express');
const {validateFields} = require("../middlewares/validateFields");
const {check} = require("express-validator");
const {login, googleSignIn} = require("../controllers/login-controller");

const router = Router();

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields], login);

router.post('/google', [
  check('token', 'You need a Google token to continue').not().isEmpty(),
  validateFields], googleSignIn)


module.exports = router;