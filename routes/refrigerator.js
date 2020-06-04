var express = require('express');
var router = express.Router();
import refrigeratorController from "../controllers/refrigeratorController";


router.post("/", refrigeratorController.addFood);

module.exports = router;
