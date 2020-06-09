import resUtil from "../modules/responseUtil";
import resMsg from "../modules/resMsg";
import statCode from "../modules/statCode";
import moment from "moment";
import models from "../models"
import encrypt from "../modules/encryption";
import jwt from "../modules/jwt";

const findUserById = async (userId) => {
    let result = await models.users.findOne({
        where: { userId }
    })
    if (result == null) {
        return "No user"
    }
    return result.dataValues;
}
export default {
    signup : async(req,res) => {
        const { userId, userPw} = req.body;
        try {
            if (!userId || !userPw) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let isValid = await models.users.findOne({ where: { userId } });
            if (isValid != null) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.ALREADY_ID));
                throw "ALREADY ID"
            }
            const { hashed, salt } = await encrypt.encrypt(userPw);
            let createUser = await models.users.create({ userId, userPw: hashed, salt});
            let userIdx = createUser.dataValues.userIdx;
            let createRefrigerator = await models.refrigerators.create({});
            let refrigeratorIdx = createRefrigerator.dataValues.refrigeratorIdx;
            await models.users_refrigerators.create({
                fk_userIdx : userIdx, fk_refrigeratorIdx : refrigeratorIdx
            })
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.SIGN_UP_SUCCESS, { userId }))
        } catch (exception) {
            console.log(exception);
            return;
        }
    },
    signin : async(req,res) => {
        const { userId, userPw} = req.body;
        try {
            if (!userId || !userPw) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NULL_VALUE));
                throw "NULL VALUE"
            }
            let userInfo = await findUserById(userId);
            if (userInfo == "No user") {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.NO_USER));
                throw "NO USER"
            }
            const { hashed } = await encrypt.encryptWithSalt(userPw, userInfo.salt);
            const { token } = jwt.sign(userInfo);
            if (userInfo.userPw != hashed) {
                res.status(statCode.BAD_REQUEST).send(resUtil.successFalse(statCode.BAD_REQUEST, resMsg.MISS_MATCH_PW));
                throw `INCORRECT PASSWORD`
            }
            res.status(statCode.OK).send(resUtil.successTrue(statCode.OK, resMsg.SIGN_IN_SUCCESS, { jwt: token, userIdx: jwt.verify(token).idx, userName: userInfo.userName }))
        } catch (exception) {
            console.log(exception);
            return;
        }
    }
}