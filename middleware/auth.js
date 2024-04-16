const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth/index");


exports.authMiddleware = (roles) => async (req, res, next) => {
    try {
        const token = getTokenFromHeaders(req.headers);

        const extractedToken = extractToken(token);

        const member = await profile(extractedToken?.id);

        if (!roles.includes(member?.role)) {
            return next({
                message: "forbidden!",
                statusCode: 403,
            });
        }

        req.member = member;


        next();
    } catch (error) {
        error.statusCode = 401; //unauthorized
        next(error);
    }

};