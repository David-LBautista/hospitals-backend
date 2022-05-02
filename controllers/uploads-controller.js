const path = require('path');
const fs = require('fs');
const {response} = require('express');
const {v4: uuidv4} = require('uuid');
const {updateImage} = require("../helpers/updateImage");

const fileToUpload = async (req, res = response) => {

  const table = req.params.table;
  const id = req.params.id;

  const validTables = ['hospitals', 'doctors', 'users'];

  if (!validTables.includes(table)) {
    return res.status(404).json({
      ok: false,
      message: 'The table is not correct, it must be one of the following hospitals/doctors/users'
    });
  }

  // validate image
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      message: 'No files were uploaded.'
    });
  }

  // process image
  const file = req.files.image;
  const splitFile = file.name.split('.');
  const fileExtension = splitFile[splitFile.length - 1];

  const validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

  if (!validExtensions.includes((fileExtension))) {
    return res.status(400).json({
      ok: false,
      message: 'The file extension of your image is not permitted'
    });
  }

  // change file name
  const fileName = `${uuidv4()}.${fileExtension}`

  // save file on its respective folder
  const path = `./uploads/${table}/${fileName}`;

  // Move image to folder
  await file.mv(path, (error) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        message: 'Unexpected error occurred'
      });
    }

    // Update Image
    updateImage(table, id, fileName);

    res.status(200).json({
      ok: true,
      message: 'File uploaded',
      fileName
    })
  });
}

const returnsImage = (req, res = response) => {
  const table = req.params.table;
  const img = req.params.img;

  const pathImage = path.join(__dirname, `../uploads/${table}/${img}`);

  //default image
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const noImageFound = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(noImageFound);
  }
}


module.exports = {
  fileToUpload,
  returnsImage
}