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

const putHospitals = async (req, res = response) => {

  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: true,
        message: 'Hospital not found'
      });
    }

    const hospitalProperties = {
      ...req.body,
      user: uid
    }

    const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalProperties, {new: true})

    res.status(200).json({
      ok: true,
      hospitalUpdated
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: 'Unexpected error'
    });
  }

}

const deleteHospitals = async (req, res = response) => {

  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id)

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        message: 'Hospital not found'
      })
    }
    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      message: 'Hospital deleted'
    })

  } catch (error) {
    res.status(500).json({
      ok: true,
      message: 'Unexpected error'
    });
  }
}


module.exports = {
  getHospitals,
  postHospitals,
  putHospitals,
  deleteHospitals
}