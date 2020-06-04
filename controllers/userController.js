import resUtil from "../modules/responseUtil";
import resMsg from "../modules/resMsg";
import statusCode from "../modules/statusCode";
import moment from "moment";
import models from "../models"
import encryption from "../modules/encryption";

export default {
    signup : async(req,res) => {
        let {userId, userPw} = req.body;
        let {salt, hashed} = await encryption.encrypt(userPw);
        await models.users.create({userId, userPw : hashed, salt})
        res.status(statusCode.OK).send(resUtil.successTrue(statusCode.OK, resMsg.SIGN_UP_SUCCESS));
    },
    signin : async(req,res) => {
        let {userId, userPw} = req.body;
        //await models.users.read()
    }
}