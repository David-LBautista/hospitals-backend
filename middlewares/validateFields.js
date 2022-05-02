const {response} = require('express');
const {validationResult} = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  // check all the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }
  next();
};

module.exports = {
  validateFields
};