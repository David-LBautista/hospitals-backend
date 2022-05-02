const {response} = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospitals');
const Doctor = require('../models/doctor');


const searchAll = async (req, res = response) => {
  const userSearch = req.params.search
  const regex = new RegExp(userSearch, 'i');

  try {
    const [users, hospitals, doctors] = await Promise.all([
      User.find({
        name: regex
      }),
      Hospital.find({
        name: regex
      }),
      Doctor.find({
        name: regex
      })
    ])

    res.status(200).json({
      ok: true,
      message: 'Your search....',
      users,
      hospitals,
      doctors,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    })
  }

}

const getDocumentsByCollection = async (req, res = response) => {

  const table = req.params.table;
  const userSearch = req.params.search
  const regex = new RegExp(userSearch, 'i');

  let data = [];

  switch (table) {
    case 'doctors':
      data = await Doctor.find({
        name: regex
      });
      break;
    case 'hospitals':
      data = await Hospital.find({
        name: regex
      });
      break;
    case 'users':
      data = await User.find({
        name: regex
      });
      break;
    default:
      return res.status(400).json({
        ok: false,
        message: 'Table must be one of the following: doctors/hospitals/users'
      })
  }

  res.status(200).json({
    ok: true,
    data
  })
}

module.exports = {
  searchAll,
  getDocumentsByCollection
}