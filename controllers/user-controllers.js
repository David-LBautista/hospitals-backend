const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (request, response) => {
  const from = Number(request.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find().skip(from).limit(5),
    User.count(),
  ]);

  response.status(200).json({
    ok: true,
    total,
    users,
    uid: request.uid,
  });
};

const postUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return response.status(400).json({
        ok: false,
        message: 'Email already exists',
      });
    }
    const user = new User(request.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // save user
    await user.save();
    const token = await generateJWT(user.id);

    response.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: 'Unexpected error',
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.json(404).json({
        ok: false,
        message: 'User does not exists',
      });
    }

    const { google, password, email, ...fieldsToUpdate } = req.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          message: 'Email already exists',
        });
      }
    }

    // Validate token and validate user

    // Update User
    if (!userDB.google) {
      fieldsToUpdate.email = email;
    } else if (userDB.email !== email) {
      return res.status(400).json({
        ok: false,
        message: 'Google Users can not change their email',
      });
    }
    const updatedUser = await User.findByIdAndUpdate(uid, fieldsToUpdate, {
      new: true,
    });

    res.status(203).json({
      ok: true,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Unexpected error',
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userToDelete = await User.findById(uid);

    if (!userToDelete) {
      return res.json(404).json({
        ok: false,
        message: 'User does not exists',
      });
    }

    await User.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      message: 'User deleted',
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      message: 'Can´t delete user, something went wrong',
    });
  }
};

module.exports = {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
};
