const jwt = require('./jwt');
const responseUtil = require('./responseUtil');
const statusCode = require('./statCode');
const resMsg = require('./resMsg');

const authUtil = {
    //middlewares
    //미들웨어로 token이 있는지 없는지 확인하고
    //token이 있다면 jwt.verify함수를 이용해서 토큰 hash를 확인하고 토큰에 들어있는 정보 해독
    //해독한 정보는 req.decoded에 저장하고 있으며 이후 로그인 유무는 decoded가 있는지 없는지를 통해 알 수 있음
    checkToken: async (req, 
        res, next) => {
        var token = req.headers.jwt
        if (!token) {
            return res.status(statusCode.FORBIDDEN).send(responseUtil.successFalse(statusCode.FORBIDDEN, resMsg.EMPTY_TOKEN))
        }
        const user = jwt.verify(token);
        if (user == -3) {
            return res.status(statusCode.FORBIDDEN).send(responseUtil.successFalse(statusCode.FORBIDDEN, resMsg.EXPIRED_TOKEN))
        }
        if (user == -2) {
            return res.status(statusCode.FORBIDDEN).send(responseUtil.successFalse(statusCode.FORBIDDEN, resMsg.EXPIRED_TOKEN))
        }
        if (user.idx == undefined) {
            return res.status(statusCode.FORBIDDEN).send(responseUtil.successFalse(statusCode.FORBIDDEN, resMsg.EXPIRED_TOKEN))
        }
        req.decoded = user;
        next();
    }
}
module.exports = authUtil