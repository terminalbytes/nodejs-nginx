/**
 * Building a request router that conforms to industry standards would probably be out of scope for this project.
 * I can use switch case with the request method and path to route the request to the correct handler.
 */
import FindMyWay, { HTTPMethod, HTTPVersion } from "find-my-way";
import { IncomingMessage, ServerResponse } from "http";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import recipeRoutes from "@routes/recipe";
import authWrapper from "@routes/middleware/auth-strategy";
import userRoutes from "@routes/user";
import { HTTPStatus, ResponseMessages } from "@utils/constants";

const API_PREFIX = "/api";

export type Request = IncomingMessage & Http2ServerRequest & {
    query: Record<string, string>,
    body: Record<string, any>,
};
export type Response = ServerResponse | Http2ServerResponse;

export type Handler<V extends HTTPVersion> = (
    req: Request,
    params: { [k: string]: string | undefined },
) => Promise<any>;

export interface IRoute<V extends HTTPVersion> {
    method: HTTPMethod;
    path: string;
    handler: Handler<V>;
    protected: boolean;
    version?: string; // We can use this to implement API versioning based on the request header "Version"
}

const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
        res.statusCode = 404;
        res.end();
    },
    onBadUrl: (path, req, res) => {
        res.statusCode = 400;
        res.end(`Bad path: ${path}`);
    },
    maxParamLength: 100, // Ignore params longer than 100 characters and route to 404.
});

findMyWay.get("/", (req, res) => {
    res.statusCode = 200;
    res.end("Welcome to the recipe API. Weird choice of url, but nothing to look here.");
});

const routes: IRoute<HTTPVersion>[] = [
    ...recipeRoutes,
    ...userRoutes,
];

for (const route of routes) {
    const constraints: { [key: string]: any } = {};
    if (route.version) {
        constraints.version = route.version; // Check the request header "Version" for the route version
    }

    findMyWay.on(
        route.method,
        API_PREFIX + route.path,
        { constraints },
        authWrapper(route.handler),
        { protected: route.protected }
    );
}

const parseBodyAndRouteRequest = (req: IncomingMessage, res: ServerResponse) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("end", () => {
        if (body && body.length > 0) {
            try {
                (req as Request).body = JSON.parse(body); // we should probably check for the content-type header here.
                findMyWay.lookup(req, res);
            } catch (error) {
                res.statusCode = HTTPStatus.BadRequest;
                res.end(ResponseMessages.BadRequest);
                return;
            }
        } else {
            findMyWay.lookup(req, res);
        }
    });
};
export default parseBodyAndRouteRequest;