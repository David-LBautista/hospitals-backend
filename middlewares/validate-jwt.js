const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = (req, res, next) => {
  // read token from headers
  const token = req.header('x-token');

  //verify token
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(uid);

    req.uid = uid;
    next();
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: 'Invalid token',
    });
  }
};

const validateAdminRole = async (req, res, next) => {
  const uid = req.uid;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    if (userDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        message: 'No tienes los permisos necesarios',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

module.exports = {
  validateJWT,
  validateAdminRole,
};
