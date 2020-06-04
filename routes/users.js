import express from "express";
var router = express.Router();
import userController from "../controllers/userController";

router.post('/', userController.signup);

module.exports = router;
