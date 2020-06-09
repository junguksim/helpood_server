var express = require('express');
var router = express.Router();
import refrigeratorController from "../controllers/refrigeratorController";
import authUtil from "../modules/authUtil";


router.post("/", authUtil.checkToken ,refrigeratorController.addFood);
router.delete("/", refrigeratorController.deleteFood)

module.exports = router;
