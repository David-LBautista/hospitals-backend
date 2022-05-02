const fs = require('fs');

const User = require('../models/user');
const Hospital = require('../models/hospitals');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

const updateImage = async (table, id, fileName) => {
  switch (table) {

    case 'doctors':
      const doctorExists = await Doctor.findById(id);
      if (!doctorExists) {
        return false;
      }
      const doctorImagePath = `./uploads/doctors/${doctorExists.img}`;
      deleteImage(doctorImagePath)

      doctorExists.img = fileName;
      await doctorExists.save();
      return true;

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      const hospitalImagePath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(hospitalImagePath)

      hospital.img = fileName;
      await hospital.save();
      return true;

    case 'users':
      const user = await User.findById(id);
      if (!user) {
        return false;
      }
      const userImagePath = `./uploads/users/${user.img}`;
      deleteImage(userImagePath)

      user.img = fileName;
      await user.save();
      return true;
  }
}

/*var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));*/


module.exports = {
  updateImage
}