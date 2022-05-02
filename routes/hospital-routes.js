/*
    Route: /api/hospital
 */
const {Router} = require('express');
const {check} = require('express-validator')
const {getHospitals, postHospitals, putHospitals, deleteHospitals} = require("../controllers/hospitals-controller");
const {validateJWT} = require("../middlewares/validate-jwt");
const {validateFields} = require("../middlewares/validateFields");

const router = Router();

router.get('/', getHospitals);

router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
], postHospitals);

router.put('/:id', [], putHospitals);

router.delete('/:id', deleteHospitals);

module.exports = router;