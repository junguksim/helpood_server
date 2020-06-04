var express = require('express');
var router = express.Router();
const imageSenseController = require('../controllers/imageSenseController');

router.post('/', imageSenseController.imageSense);

module.exports = router;