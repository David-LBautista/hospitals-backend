const {response} = require('express');
const Hospital = require('../models/hospitals');

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital
    .find()
    .populate('user', 'name');
  res.status(200).json({
    ok: true,
    hospitals
  });
}

const postHospitals = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body
  });

  try {
    const newHospital = await hospital.save();

    res.status(200).json({
      ok: true,
      message: 'Hospital created',
      newHospital
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: 'Unexpected error'
    });
  }
}

const putHospitals = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: 'Hospital Updated'
  });
}

const deleteHospitals = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: 'Hospital deleted'
  });
}


module.exports = {
  getHospitals,
  postHospitals,
  putHospitals,
  deleteHospitals
}