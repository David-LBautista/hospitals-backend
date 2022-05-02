/*
  AUTH
  Auth routes: /api/auth
*/

const {Router} = require('express');
const {validateFields} = require("../middlewares/validateFields");
const {check} = require("express-validator");
const {login, googleSignIn, renewToken} = require("../controllers/login-controller");
const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields], login);

router.post('/google', [
  check('token', 'You need a Google token to continue').not().isEmpty(),
  validateFields], googleSignIn)

router.get('/renew', validateJWT, renewToken)


module.exports = router;