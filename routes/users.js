import express from "express";
var router = express.Router();
import userController from "../controllers/userController";

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;
