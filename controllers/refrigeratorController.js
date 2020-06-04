import resUtil from "../modules/responseUtil";
import resMsg from "../modules/resMsg";
import statusCode from "../modules/statusCode";
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
        await models.foods.create({
            foodName
        })
        res.status(statusCode.OK).send(resUtil.successTrue(statusCode.OK, resMsg.ADD_FOOD_SUCCESS))
    },
    deleteFood : async(req, res) => {
        
    }
}