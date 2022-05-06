const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'Email or password invalid',
      });
    }
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Email or password invalid',
      });
    }

    // Generate token
    const token = await generateJWT(userDB.id);

    res.status(200).json({
      ok: true,
      message: 'Logged in',
      token,
    });
  } catch (error) {
    response.status(400).json({
      ok: false,
      message: 'Unexpected error',
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const userDb = await User.findOne({ email });
    let googleUser;

    if (!userDb) {
      googleUser = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      });
    } else {
      googleUser = userDb;
      googleUser.google = true;
    }
    await googleUser.save();

    // Generate token
    const token = await generateJWT(googleUser.id);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Unexpected error, Google token not valid',
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  const userLoggedIn = await User.findById(uid);

  const token = await generateJWT(uid);

  res.status(200).json({
    ok: true,
    token,
    userLoggedIn,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
