const {Router} = require('express');
const {searchAll, getDocumentsByCollection} = require("../controllers/search-all-controller");
const {validateJWT} = require("../middlewares/validate-jwt");


const router = Router();

router.get('/:search', validateJWT, searchAll);
router.get('/collection/:table/:search', validateJWT, getDocumentsByCollection);


module.exports = router;