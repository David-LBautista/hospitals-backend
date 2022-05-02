const {response} = require('express');
const Doctor = require("../models/doctor")

const getDoctors = async (req, res = response) => {
  try {
    const doctors = await Doctor
      .find()
      .populate('user', 'name')
      .populate('hospital', 'name');

    res.status(200).json({
      ok: true,
      doctors
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: 'Unexpected error'
    });
  }
}

const postDoctors = async (req, res = response) => {
  const uid = req.uid;

  const doctor = new Doctor({
    user: uid,
    ...req.body
  });
  try {
    const newDoctor = await doctor.save();
    res.status(200).json({
      ok: true,
      message: 'Doctor created',
      newDoctor
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      message: 'Unexpected error'
    });
  }

}

const putDoctors = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: 'Doctor Updated'
  });
}

const deleteDoctors = (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: 'Doctor deleted'
  });
}


module.exports = {
  getDoctors,
  postDoctors,
  putDoctors,
  deleteDoctors
}