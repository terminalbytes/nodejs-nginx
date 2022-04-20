import { Handler, Request, Response } from "@routes/index";
import { ErrorMessages, HTTPStatus, LISTEN_INET, PORT, RequestHeaders, SupportedContentTypes } from "@utils/constants";
import { toPlainText } from "@utils/content-converters/text-converter";
import { toXml } from "@utils/content-converters/xml-converter";
import { logger } from "@utils/logger";
import { HTTPVersion } from "find-my-way";

const parseQueryString = (req: Request) => {
    try {
        if (req.url) {
            const url = new URL(req.url, `http://${LISTEN_INET}:${PORT}`);
            req.query = Object.fromEntries(url.searchParams);
        }
    } catch (error) {
        logger.error({ error }, "Error parsing query string");
    }
};

const contentNegotiationWrapper = async <V extends HTTPVersion>(
    req: Request,
    res: Response,
    params: any,
    handler: Handler<HTTPVersion>,
) => {
    try {
        const contentType = req.headers[RequestHeaders.Accept]?.toLowerCase()?.split(";")[0]; // Only support one content type for the scope of this project
        parseQueryString(req);
        const responseObject = await handler(req, params);

        if (contentType && Object.values(SupportedContentTypes).includes(contentType as SupportedContentTypes)) {
            logger.info({ contentType }, "Content type supported");
            switch (contentType) {
                case SupportedContentTypes.ApplicationXml:
                    res.statusCode = responseObject.code || HTTPStatus.Ok;
                    res.setHeader(RequestHeaders.ContentType, SupportedContentTypes.ApplicationXml);
                    res.end(toXml(responseObject));
                    break;
                case SupportedContentTypes.PlainText:
                    res.statusCode = responseObject.code || HTTPStatus.Ok;
                    res.setHeader(RequestHeaders.ContentType, SupportedContentTypes.PlainText);
                    res.end(toPlainText(responseObject));
                    break;
                default:
                    res.statusCode = responseObject.code || HTTPStatus.Ok;
                    res.setHeader(RequestHeaders.ContentType, SupportedContentTypes.ApplicationJson);
                    res.end(JSON.stringify(responseObject));
                    break;
            }
        } else {
            res.statusCode = responseObject.code || HTTPStatus.Ok;
            res.setHeader(RequestHeaders.ContentType, SupportedContentTypes.ApplicationJson);
            res.end(JSON.stringify(responseObject));
        }
    } catch (error) {
        logger.error({ error }, "Error processing request");
        res.statusCode = HTTPStatus.InternalServerError;
        // Probably not a good idea from a security standpoint to send the error object to the client
        // Sending something generic
        res.end(JSON.stringify({ error: ErrorMessages.InternalServerError }));
    }
};

export default contentNegotiationWrapper;