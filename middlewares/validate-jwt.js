const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // read token from headers
  const token = req.header('x-token');

  //verify token
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided'
    });
  }


  try {
    const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(uid)

    req.uid = uid;
    next();

  } catch (error) {
    res.status(404).json({
      ok: false,
      message: 'Invalid token'
    })
  }
}

module.exports = {
  validateJWT
}