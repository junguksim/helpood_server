const request = require('request');
const ak = require('../config/ak');
const fs = require("fs");

module.exports = {
    objDetection : (image) => {
        return new Promise((resolve, reject)=>{
            const options = {
                "uri" : "https://naveropenapi.apigw.ntruss.com/vision-obj/v1/detect",
                "method" : 'POST',
                "form" : {
                    image : fs.createReadStream('kids.jpg')
                },
                "headers" : {
                    "X-NCP-APIGW-API-KEY-ID" : `${ak.cid}`,
                    "X-NCP-APIGW-API-KEY" : `${ak.cs}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            request(options, (err, result)=>{
                if(err) console.log(err)
                console.log(result.body);
                resolve(result.body)
            })
        })
    }
}