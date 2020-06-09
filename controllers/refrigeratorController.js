import resUtil from "../modules/responseUtil";
import resMsg from "../modules/resMsg";
import statusCode from "../modules/statCode";
import moment from "moment";
import models from "../models"

export default {
    addFood : async(req, res) => {
        /***
         * * body
         * foodName : string
         * purchaseDate : datetime
         * 
         */
        let {foodName, purchaseDate} = req.body;
        let userIdx = req.decoded.idx;
        let fk_refrigeratorIdx = (await models.users_refrigerators.findOne({where : {fk_userIdx : userIdx}})).dataValues.fk_refrigeratorIdx
        console.log(fk_refrigeratorIdx)
        await models.foods.create({
            foodName, purchaseDate, fk_refrigeratorIdx
        })
        res.status(statusCode.OK).send(resUtil.successTrue(statusCode.OK, resMsg.ADD_FOOD_SUCCESS))
    },
    deleteFood : async(req, res) => {
        let {foodIdx} = req.body;
        await models.foods.destroy({where: {foodIdx}})
        res.status(statusCode.OK).send(resUtil.successTrue(statusCode.OK, resMsg.DELETE_FOOD_SUCCESS))
    }
}