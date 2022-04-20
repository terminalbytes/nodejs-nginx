import { HTTPVersion, Req, Res } from "find-my-way";
import { Handler, Request } from "@routes/index";
import { ErrorMessages, HTTPStatus, RequestHeaders } from "@utils/constants";
import { logger } from "@utils/logger";
import { verifyToken } from "@utils/password-utils";
import contentNegotiationWrapper from "@routes/middleware/content-negotiation";


const validateJwt = (authorization: string | undefined) => {
    if (authorization && authorization.startsWith("Bearer ")) {
        return verifyToken(authorization.split(" ")[1]);
    } else {
        return false;
    }
};

const authWrapper = <V extends HTTPVersion>(
    handler: Handler<HTTPVersion>,
) => {
    return (req: Req<V>, res: Res<V>, params: any, store: any) => {
        try {
            logger.info({ authorization: req.headers[RequestHeaders.Authorization], store }, "Checking authorization");

            if (store?.protected) {
                if (validateJwt(req.headers[RequestHeaders.Authorization])) {
                    logger.info({}, "Authorized");
                    return contentNegotiationWrapper(req as Request, res, params, handler);
                } else {
                    res.statusCode = HTTPStatus.Unauthorized;
                    res.end(ErrorMessages.Unauthorized);
                }
            } else {
                return contentNegotiationWrapper(req as Request, res, params, handler);
            }
        } catch (error) {
            // cases where the client closes the connection before the response is sent
            logger.error({ error }, "Server error");
        }
    };
};

export default authWrapper;