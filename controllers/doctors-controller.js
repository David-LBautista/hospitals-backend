const {response} = require('express');
const Doctor = require("../models/doctor")
const Hospital = require("../models/hospitals");

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

const putDoctors = async (req, res = response) => {

  const id = req.params.id;
  const uid = req.uid;

  try {
    const doctorDb = await Doctor.findById(id);
    if (!doctorDb) {
      return res.status(404).json({
        ok: false,
        message: 'Doctor not found'
      })
    }

    const doctorInfo = {
      ...req.body,
      user: uid
    }

    const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorInfo, {new: true});

    res.status(200).json({
      ok: true,
      doctorUpdated
    });
  } catch (error) {
    res.status(200).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}

const deleteDoctors = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        message: 'Doctor not found'
      })
    }
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: 'Doctor deleted'
    });
  } catch (error) {
    res.status(200).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}


module.exports = {
  getDoctors,
  postDoctors,
  putDoctors,
  deleteDoctors
}