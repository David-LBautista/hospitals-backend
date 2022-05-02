const {Router} = require('express');
const fileUpload = require('express-fileupload');

const {validateJWT} = require("../middlewares/validate-jwt");
const {fileToUpload, returnsImage} = require("../controllers/uploads-controller");


const router = Router();
router.use(fileUpload());
router.put('/:table/:id', validateJWT, fileToUpload);
router.get('/:table/:img', validateJWT, returnsImage);


module.exports = router;