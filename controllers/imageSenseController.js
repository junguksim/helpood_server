const fs = require("fs");
const naverAPI = require("../modules/naverAPI");

module.exports = {
    imageSense : async (req, res) => {
        try {
            let data = fs.createReadStream('cat.jpg');
            await naverAPI.objDetection(data)
            res.send({"hi" : "hi"})
        }catch(exception) {
            console.log(exception);
        }
    }
}