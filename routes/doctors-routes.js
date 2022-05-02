/*
Route: /api/doctor
 */

const {Router} = require('express');
const {check} = require('express-validator')
const {getDoctors, postDoctors, putDoctors, deleteDoctors} = require("../controllers/doctors-controller");
const {validateJWT} = require("../middlewares/validate-jwt");
const {validateFields} = require("../middlewares/validateFields");

const router = Router();

router.get('/', getDoctors);

router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('hospital', 'Hospital is required and must be a valid ID').isMongoId(),

  validateFields
], postDoctors);

router.put('/:id', [], putDoctors);

router.delete('/:id', deleteDoctors);

module.exports = router;